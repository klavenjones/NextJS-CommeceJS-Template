import '../styles/globals.css'
import { CartProvider, ModalProvider, CheckoutProvider } from '../context'

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
      <CartProvider>
        <CheckoutProvider>
          <Component {...pageProps} />
        </CheckoutProvider>
      </CartProvider>
    </ModalProvider>
  )
}

export default MyApp
