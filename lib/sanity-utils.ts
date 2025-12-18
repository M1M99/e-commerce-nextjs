import { client } from "@/sanity/client"
import { PRODUCTS_QUERY, PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS_QUERY } from "@/sanity/queries"

export interface Product {
  _id: string
  title: string
  slug: { current: string }
  price: number
  mainImageUrl: string
  mainImageAlt: string
  availability: "inStock" | "outOfStock"
  category?: string
  metaDescription?: string
  description?: any
  galleryImages?: { url: string; alt?: string }[]
  metaTitle?: string
  _createdAt?: string
  _updatedAt?: string
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await client.fetch(PRODUCTS_QUERY, {}, { next: { revalidate: 3600 } })
    return products || []
  } catch (error) {
    console.error("[v0] Failed to fetch products from Sanity:", error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug }, { next: { revalidate: 3600 } })
  } catch (error) {
    console.error("[v0] Failed to fetch product by slug:", error)
    return null
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch(PRODUCT_SLUGS_QUERY, {}, { next: { revalidate: 3600 } })
    return slugs || []
  } catch (error) {
    console.error("[v0] Failed to fetch product slugs:", error)
    return []
  }
}
