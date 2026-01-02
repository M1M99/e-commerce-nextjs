import type { MetadataRoute } from "next"
import { getAllProductSlugs } from "@/lib/sanity-utils"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://vitaminaz.vercel.app"

  const productSlugs = await getAllProductSlugs()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changefreq: "daily",  // 🔹 düzgün açar
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changefreq: "monthly",
      priority: 0.8,
    },
  ]

  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => {
    const cleanSlug = slug.replace(/^\/+/, "")  
    return {
      url: `${baseUrl}/products/${cleanSlug}`,
      lastModified: new Date(),
      changefreq: "weekly",
      priority: 0.9,
    }
  })

  return [...staticPages, ...productPages]
}
