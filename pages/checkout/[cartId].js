import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import commerce from '../../lib/commerce'

export default function Checkout() {
  const [liveObject, setLiveObject] = useState(null)
  const [tokenId, setTokenId] = useState(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { cartId } = router.query

  useEffect(() => {
    const fetchCheckout = async (cartId) => {
      try {
        let checkout = await commerce.checkout.generateToken(cartId, {
          type: 'cart'
        })
        setLoading(false)
        setTokenId(checkout.id)
        setLiveObject(checkout.live)
      } catch (error) {
        console.log('ERROR', error.message)
      }
    }

    fetchCheckout(cartId)
  }, [cartId])

  if (loading) {
    return <h1>Loading......</h1>
  }

  if (!tokenId) {
    return <h1>Something went wrong</h1>
  }

  return (
    <div>
      <h1>Checkout Token: {tokenId}</h1>
      <h1>Cart ID Token: {cartId}</h1>
      <h1>LiveCart: {liveObject?.total.formatted_with_symbol} </h1>
    </div>
  )
}
