import commerce from '../lib/commerce'
import { useCartState, useCartDispatch } from '../context/cart'

function CartItem({ id, name, quantity, line_total }) {
  const { setCart } = useCartDispatch()
  const handleUpdateCart = ({ cart }) => setCart(cart)

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
    </>
  )
}

export default function CartPage() {
  const { line_items, subtotal } = useCartState()
  const isEmpty = line_items.length === 0

  if (isEmpty) return <h1> The cart is empty</h1>

  return (
    <div>
      <h1>Cart</h1>
      {line_items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <hr />
      <strong>SubTotal</strong> {subtotal.formatted_with_symbol}
    </div>
  )
}
