import ProductList from '../components/products/productList'
import commerce from '../lib/commerce'

export async function getStaticProps() {
  const { data: products } = await commerce.products.list()

  return {
    props: {
      products
    }
  }
}

export default function ProductPage({ products }) {
  return (
    <>
      <h1>Products</h1>
      <ProductList products={products} />
    </>
  )
}
