import commerce from '../lib/commerce'

import ProductList from '../components/products/productList'
import CategoryList from '../components/category/categoryList'

import Link from 'next/link'

export async function getStaticProps() {
  const merchant = await commerce.merchants.about()
  const { data: products } = await commerce.products.list()
  const { data: categories } = await commerce.categories.list()

  return {
    props: {
      merchant,
      products,
      categories
    }
  }
}

export default function Home({ merchant, products, categories }) {
  return (
    <>
      <h1>{merchant.business_name}</h1>
      <h3>
        <Link href='/categories'>
          <a>Categories</a>
        </Link>
      </h3>
      <CategoryList categories={categories} />

      <h3>
        <Link href='/products'>
          <a>Products</a>
        </Link>
      </h3>
      <ProductList products={products} />
    </>
  )
}
