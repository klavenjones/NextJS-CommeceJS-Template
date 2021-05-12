import React from 'react'
import Link from 'next/link'
import Category from './category'

export default function CategoryList({ categories }) {
  return (
    <>
      <ul>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/categories/${category.slug}`}>
              <a>
                <Category {...category} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
