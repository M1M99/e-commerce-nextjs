import Link from "next/link"
import Image from "next/image"
import { getPosts } from "@/lib/sanity-utils"

// SEO Metadata: OpenGraph və Twitter kartları əlavə edildi
export const metadata = {
  title: "Sağlamlıq Bloqu | VitaminAz",
  description: "Vitaminlər, sağlam qidalanma və həyat tərzi haqqında ən son məqalələr və faydalı məsləhətlər.",
  openGraph: {
    title: "Sağlamlıq Bloqu | VitaminAz",
    description: "Sağlamlıq haqqında faydalı məqalələr.",
    type: "website",
    locale: "az_AZ",
  },
}

export default async function BlogPage() {
  const posts = await getPosts()

  // SEO: Google üçün Structured Data (Schema Markup)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "VitaminAz Blog",
    "description": "Sağlamlıq və vitaminlər haqqında məqalələr",
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "image": post.mainImageUrl,
      "datePublished": post.publishedAt,
      "author": {
        "@type": "Organization",
        "name": "VitaminAz"
      }
    }))
  }

  return (
    <>
      {/* Schema Markup-ı səhifəyə əlavə edirik */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 py-16 bg-gray-50/50 min-h-screen">
        {/* Header Bölməsi */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Sağlamlıq Bloqu
          </h1>
          <p className="text-lg text-gray-600">
            Sağlamlığınız üçün ən son elmi araşdırmalar və faydalı məsləhətlər.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <span className="text-4xl mb-4">📝</span>
            <p className="text-lg text-gray-500 font-medium">Hələ heç bir məqalə paylaşılmayıb.</p>
            <p className="text-sm text-gray-400">Tezliklə yeni məqalələr burada olacaq.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post._id} 
                href={`/blog/${post.slug.current}`} 
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Şəkil Bölməsi */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
                  {post.mainImageUrl ? (
                    <Image 
                      src={post.mainImageUrl} 
                      alt={post.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                       📷 Şəkil yoxdur
                    </div>
                  )}
                </div>

                {/* Məzmun Bölməsi */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Tarix */}
                  <div className="flex items-center gap-2 text-xs text-blue-600 font-medium mb-3 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"></line>
                      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"></line>
                      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"></line>
                    </svg>
                    {new Date(post.publishedAt).toLocaleDateString("az-AZ", {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-sm font-semibold text-blue-600 mt-auto group/btn">
                    Oxumağa davam et
                    <svg className="w-4 h-4 ml-1 transform transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}