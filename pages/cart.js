import { useCartState } from '../context/cart'

function CartItem({ name, quantity, line_total }) {
  return (
    <>
      <h1>{name}</h1>
      <h1>{quantity}</h1>
      <h1>{line_total.formatted_with_symbol}</h1>
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
