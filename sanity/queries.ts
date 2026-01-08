import { groq } from "next-sanity"
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
export const PRODUCT_SLUGS_QUERY = groq`
  *[_type == "product" && defined(slug.current)][].slug.current
`
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

export const POSTS_QUERY = groq`
  *[_type == "blog" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    "mainImageUrl": mainImage.asset->url,
    "excerpt": array::join(string::split((pt::text(body))[0..200], "")[0..200], "") + "..."
  }
`

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    title,
    slug,
    mainImage {
      alt,
      asset->{
        url
      }
    },
    publishedAt,
    body,
    author->{
      name,
      image
    },
    relatedProduct->{
      title,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      price,
      availability
    }
  }
`
