import Link from 'next/link'
import commerce from '../lib/commerce'
import { useCartState, useCartDispatch } from '../context/cart'

function CartItem({ id, name, quantity, line_total, cartId }) {
  const { setCart } = useCartDispatch()

  const handleUpdateCart = ({ cart }) => setCart(cart)

  const generateTokenId = async () => {
    let checkout = await commerce.checkout.generateToken(cartId, {
      type: 'cart'
    })
    console.log('Token', checkout.id)
    let live = await commerce.checkout.getLive(checkout.id)
    console.log('LIVE', live)
  }

  const removeItem = () => commerce.cart.remove(id).then(handleUpdateCart)

  const decrementQuantity = () => {
    quantity > 1
      ? commerce.cart
          .update(id, { quantity: quantity - 1 })
          .then(handleUpdateCart)
      : removeItem()
  }

  const incrementQuantity = () => {
    commerce.cart.update(id, { quantity: quantity + 1 }).then(handleUpdateCart)
  }

  return (
    <>
      <h1>{name}</h1>
      <h1>{quantity}</h1>
      <h1>{line_total.formatted_with_symbol}</h1>
      <button onClick={decrementQuantity}>-</button>
      <button onClick={incrementQuantity}>+</button>
      <button onClick={removeItem}>x</button>
      <button onClick={generateTokenId}>Generate Token</button>
    </>
  )
}

export default function CartPage() {
  const { line_items, subtotal, id } = useCartState()
  const isEmpty = line_items.length === 0

  if (isEmpty) return <h1> The cart is empty</h1>

  return (
    <div>
      <h1>Cart {id}</h1>
      {line_items.map((item) => (
        <CartItem key={item.id} cartId={id} {...item} />
      ))}
      <hr />
      <strong>SubTotal</strong> {subtotal.formatted_with_symbol}
      <Link href={`/checkout/${id}`}>
        <a>Checkout</a>
      </Link>
    </div>
  )
}
