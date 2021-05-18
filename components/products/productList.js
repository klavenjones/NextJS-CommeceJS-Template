import Link from 'next/link'
import Product from './product'

import React from 'react'

export default function ProductList({ products }) {
  if (!products || products.length === 0) return null

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.permalink}`}>
            <a>
              <Product {...product} />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
