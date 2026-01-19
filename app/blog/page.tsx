import Link from "next/link"
import Image from "next/image"
import { getPosts } from "@/lib/sanity-utils"
import { CartButton } from "@/components/cart-button"
import { Instagram } from "lucide-react"

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

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Salam, məhsullar haqqında məlumat almaq istəyirəm.`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen flex flex-col">
        {/* Header Bölməsi */}
        <header className="border-b bg-background sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              <a href="/">VitaminAz</a>
            </h1>
            <nav className="flex items-center gap-6">
              <a href="/" className="text-sm font-medium hover:text-primary">
                Məhsullar
              </a>
              <a href="/contact" className="text-sm font-medium hover:text-primary">
                Əlaqə
              </a>
              <CartButton />
            </nav>
          </div>
        </header>

        {/* Əsas Məzmun */}
        <main className="flex-1 bg-gray-50/50">
          <div className="container mx-auto px-4 py-14 min-h-screen">
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
                    <div className="relative w-full h-80 aspect-[16/9] overflow-hidden bg-gray-100">
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

                    <div className="flex flex-col flex-1 p-6">
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
                      
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
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
        </main>

        {/* Footer Bölməsi */}
        <footer className="border-t bg-muted/30">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-3">VitaminAz</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Bakıda güvənli onlayn alış-veriş. Keyfiyyətli məhsullar və sürətli çatdırılma.
                </p>
                <div className="flex gap-3 mt-2">
                  <a
                    href="https://www.instagram.com/vitaminaz.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram səhifəmiz"
                    className=" flex items-center justify-center w-9 h-9 rounded-full bg-pink-600 hover:bg-pink-700 text-white transition-colors shadow-sm"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp ilə əlaqə"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Keçidlər</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/" className="text-muted-foreground hover:text-foreground">
                      Ana Səhifə
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="text-muted-foreground hover:text-foreground">
                      Blog & Məqalələr
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-muted-foreground hover:text-foreground">
                      Bizimlə Əlaqə
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Ünvan</h3>
                <p className="text-sm text-muted-foreground">
                  Xidmət ərazisi: Bakı, Azərbaycan
                  <br />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp İlə Sifariş
                </a>
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
             <p>&copy; {new Date().getFullYear()} Baku Shop. All rights reserved.</p>
           </div>
          </div>
        </footer>
      </div>
    </>
  )
}
