import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPost } from "@/lib/sanity-utils"
import { PortableText } from "@/lib/portable-text"
import { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const mainImage = post.mainImageUrl || post.mainImage?.asset?.url || "/placeholder.jpg"

  return {
    title: `${post.title} | VitaminAz Blog`,
    description: post.excerpt || `${post.title} haqqında ətraflı məlumat əldə edin.`,
    alternates: {
      canonical: `https://vitamin.az/blog/${slug}`, // SEO: Canonical URL vacibdir
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://vitamin.az/blog/${slug}`,
      images: [{ url: mainImage, width: 1200, height: 630, alt: post.title }],
      siteName: "VitaminAz",
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const imageUrl = post.mainImageUrl || post.mainImage?.asset?.url
  const product = post.relatedProduct
  const currentUrl = `https://vitaminaz.vercel.app/blog/${slug}`
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: imageUrl ? [imageUrl] : [],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt, 
    author: {
      "@type": "Person",
      name: post.author?.name || "VitaminAz Team",
    },
    description: post.excerpt,
    mainEntity: product ? {
        "@type": "Product",
        name: product.title,
        image: product.imageUrl,
        offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "AZN",
            availability: "https://schema.org/InStock"
        }
    } : undefined
  }

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 py-6">
        <nav className="text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li><Link href="/" className="hover:text-primary transition">Ana Səhifə</Link></li>
            <span aria-hidden="true">/</span>
            <li><Link href="/blog" className="hover:text-primary transition">Blog</Link></li>
            <span aria-hidden="true">/</span>
            <li className="text-foreground font-medium truncate max-w-[200px]" aria-current="page">{post.title}</li>
          </ol>
        </nav>
      </div>

      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <article className="lg:col-span-8 bg-background rounded-2xl shadow-sm border p-6 md:p-10">
            <header className="mb-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium text-xs">
                  Sağlamlıq
                </span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("az-AZ", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </time>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {post.title}
              </h1>

              <div className="mb-6 flex gap-2">
                 <a 
                   href={`https://wa.me/?text=${encodeURIComponent(post.title + " - " + currentUrl)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-lg hover:bg-green-100 transition-colors"
                 >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                    WhatsApp-da Paylaş
                 </a>
              </div>
              
              {post.author && (
                <div className="flex items-center gap-3 border-t border-b py-4">
                   {/* Yazar şəkli üçün optimizasiya */}
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                    {post.author.imageUrl ? (
                        <Image 
                          src={post.author.imageUrl} 
                          alt={`${post.author.name} - Müəllif`} 
                          fill 
                          className="object-cover"
                          sizes="40px" 
                        />
                    ) : (
                        <span className="absolute inset-0 flex items-center justify-center font-bold text-gray-500">
                          {post.author.name.charAt(0)}
                        </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
                    <p className="text-xs text-gray-500">Tibbi Məsləhətçi</p>
                  </div>
                </div>
              )}
            </header>

            {imageUrl && (
              <div className="relative w-full aspect-video mb-10 rounded-xl overflow-hidden shadow-md min-h-72.25"> 
                <Image
                  src={imageUrl}
                  alt={`VitaminAz Blog - ${post.title}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
                />
              </div>
            )}

            <div className="prose prose-lg prose-blue max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-blue-600">
              {post.body && <PortableText value={post.body} />}
            </div>
          </article>

          {/* --- SIDEBAR (ASIDE) --- */}
          <aside className="lg:col-span-4 space-y-8">
            
            <div className="sticky top-24 bg-white border rounded-xl p-6 shadow-sm transition-all hover:shadow-md">
              
              {product ? (
                <section aria-labelledby="related-product-title">
                  <div className="flex items-center gap-2 mb-3">
                     <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Məsləhət
                     </span>
                  </div>
                  
                  <h3 id="related-product-title" className="text-lg font-bold mb-2 text-gray-900 leading-snug">
                    <Link href={`/products/${product.slug}`} className="hover:underline decoration-blue-500 underline-offset-4">
                        {product.title}
                    </Link>
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    Bu məqalədə bəhs edilən vitamini orijinal keyfiyyətdə əldə edin.
                  </p>
                  
                  {/* Product Image Link */}
                  <Link 
                    href={`/products/${product.slug}`} 
                    className="block group relative"
                    aria-label={`${product.title} məhsuluna bax`} // SEO: Screen reader üçün
                    title={`${product.title} - İndi al`}
                  >
                    <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden bg-gray-50 border group-hover:border-blue-200 transition-colors">
                      {product.imageUrl ? (
                        <Image 
                          src={product.imageUrl} 
                          alt={`${product.title} - VitaminAz`} // SEO: Dəqiq alt text
                          fill 
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 300px" // SEO: Sürət
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">Şəkil yoxdur</div>
                      )}
                      
                      {product.price && (
                         <div className="absolute top-2 right-2 bg-black/80 backdrop-blur text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                            {product.price} ₼
                         </div>
                      )}
                    </div>
                  </Link>

                  {/* CTA Button */}
                  <Link 
                    href={`/products/${product.slug}`}
                    className="flex items-center justify-center w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition gap-2 shadow-lg shadow-blue-600/20 active:scale-95 duration-200"
                    aria-label={`${product.title} sifariş et`}
                  >
                    Sifariş Et
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  </Link>
                  
                  <div className="text-center mt-3">
                    <span className="text-xs text-green-600 font-medium flex items-center justify-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      Stokda var • Sürətli Çatdırılma
                    </span>
                  </div>
                </section>
              ) : (
                // --- MƏHSUL YOXDUR (FALLBACK) ---
                <section>
                  <h3 className="text-xl font-bold mb-4">Sağlamlığınızı Qoruyun</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Bütün vitamin və mineralları bir ünvandan əldə edin.
                  </p>
                  
                  <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400">
                     <span className="font-bold text-xl">VitaminAz</span>
                  </div>

                  <Link 
                    href="/products" 
                    className="block w-full bg-black text-white text-center py-3 rounded-lg font-bold hover:bg-gray-800 transition"
                  >
                    Mağazaya Keç
                  </Link>
                </section>
              )}
            </div>

            <nav className="bg-gray-50 rounded-xl p-6 border" aria-label="Populyar Kateqoriyalar">
              <h4 className="font-bold mb-4 text-gray-900">Populyar Kateqoriyalar</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/?cat=sac" className="flex items-center text-gray-600 hover:text-blue-600 transition group"><span className="w-2 h-2 rounded-full bg-gray-300 mr-2 group-hover:bg-blue-500 transition-colors"></span>Saç Tökülməsi</Link></li>
                <li><Link href="/?cat=immunitet" className="flex items-center text-gray-600 hover:text-blue-600 transition group"><span className="w-2 h-2 rounded-full bg-gray-300 mr-2 group-hover:bg-blue-500 transition-colors"></span>İmmunitet</Link></li>
                <li><Link href="/?cat=usaq" className="flex items-center text-gray-600 hover:text-blue-600 transition group"><span className="w-2 h-2 rounded-full bg-gray-300 mr-2 group-hover:bg-blue-500 transition-colors"></span>Uşaq Vitaminləri</Link></li>
              </ul>
            </nav>

          </aside>
        </div>
      </main>
    </div>
  )
}
