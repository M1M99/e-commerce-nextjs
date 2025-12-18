import { groq } from "next-sanity"

// Get all products for listing page
export const PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    availability,
    category,
    metaDescription
  }
`

// Get single product by slug
export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    price,
    description,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    "galleryImages": gallery[]{
      "url": asset->url,
      alt
    },
    availability,
    category,
    metaTitle,
    metaDescription,
    _createdAt,
    _updatedAt
  }
`

// Get all product slugs for generateStaticParams
export const PRODUCT_SLUGS_QUERY = groq`
  *[_type == "product" && defined(slug.current)][].slug.current
`

// Get products by category
export const PRODUCTS_BY_CATEGORY_QUERY = groq`
  *[_type == "product" && category == $category] | order(_createdAt desc) {
    _id,
    title,
    slug,
    price,
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    availability,
    category
  }
`
