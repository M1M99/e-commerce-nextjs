import { MetadataRoute } from 'next'
import { getAllProducts, getPosts } from '@/lib/sanity-utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vitaminaz.vercel.app' 

  const products = await getAllProducts()
  
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug.current}`,
    lastModified: new Date(product._updatedAt || new Date()),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  const posts = await getPosts()

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...productUrls,
    ...postUrls,
  ]
}