
import { client } from "@/sanity/client"
import { 
  PRODUCTS_QUERY, 
  PRODUCT_BY_SLUG_QUERY, 
  PRODUCT_SLUGS_QUERY,
  POSTS_QUERY, 
  POST_BY_SLUG_QUERY 
} from "@/sanity/queries"

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

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  mainImageUrl?: string
  excerpt?: string
  body?: any
  author?: { name: string; image?: any }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await client.fetch(PRODUCTS_QUERY, {}, { next: { revalidate: 3600 } })
    return products || []
  } catch (error) {
    console.error("Məhsullar gətirilərkən xəta:", error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug }, { next: { revalidate: 3600 } })
  } catch (error) {
    console.error("Məhsul gətirilərkən xəta:", error)
    return null
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch(PRODUCT_SLUGS_QUERY, {}, { next: { revalidate: 3600 } })
    return slugs || []
  } catch (error) {
    console.error("Sluglar gətirilərkən xəta:", error)
    return []
  }
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const data = await client.fetch(POSTS_QUERY, {}, { next: { revalidate: 0 } }) // Cache-i söndürdük
    console.log("SANITY-dən GƏLƏN MƏLUMAT:", data) // Terminala baxın
    return data
  } catch (error) {
    console.error("Xəta:", error)
    return []
  }
}



export async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    return await client.fetch(
      POST_BY_SLUG_QUERY, 
      { slug }, 
      { next: { revalidate: 3600 } }
    )
  } catch (error) {
    console.error("Post gətirilərkən xəta:", error)
    return null
  }
}
