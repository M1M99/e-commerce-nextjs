import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProductBySlug, getAllProductSlugs } from "@/lib/sanity-utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PortableText, portableTextComponents } from "@/lib/portable-text"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ImageGallery } from "@/components/image-gallery"
import { CartButton } from "@/components/cart-button"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

// Generate static paths for all products
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: "Məhsul tapılmadı | VitaminAz" }
  }

  const title = product.metaTitle || `${product.title} | VitaminAz - Bakıda Onlayn Mağaza`
  const description =
    product.metaDescription ||
    `${product.title} onlayn sifarişi. Bakı daxili sürətli çatdırılma. Qiymət: ${product.price} ₼. WhatsApp ilə asan sifariş.`

  const imageUrl = product.mainImageUrl

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: product.mainImageAlt }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `/products/${slug}`,
    },
  }
}

// ISR: Revalidate every hour
export const revalidate = 3600

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const isInStock = product.availability === "inStock"
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "994709001124"
  const whatsappMessage = encodeURIComponent(
    `Salam! Marağlanıram: ${product.title}\nPrice: ${product.price} AZN\nLink: ${process.env.NEXT_PUBLIC_SITE_URL || ""}/products/${slug}`,
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.mainImageUrl,
    description: product.metaDescription || product.title,
    sku: product._id,
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/products/${slug}`,
      priceCurrency: "AZN",
      price: product.price,
      availability: isInStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "VitaminAz",
        alternateName: ["vitamin az", "Baku Shop", "Vitamin.az"],
      },
    },
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <div className="min-h-screen">
        {/* Header */}
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

        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">
              Home
            </a>
            <span>/</span>
            <a href="/" className="hover:text-foreground">
              Məhsullar
            </a>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <ImageGallery
                mainImage={{ url: product.mainImageUrl, alt: product.mainImageAlt }}
                galleryImages={product.galleryImages || []}
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                {product.category && (
                  <Badge variant="secondary" className="mb-2">
                    {product.category}
                  </Badge>
                )}
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{product.title}</h1>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold">{product.price} ₼</span>
                  {isInStock ? (
                    <Badge variant="default" className="bg-green-600">
                      Stokda var
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Bitib</Badge>
                  )}
                </div>
              </div>

              {product.description && (
                <div className="prose prose-sm max-w-none mb-8">
                  <PortableText value={product.description} components={portableTextComponents} />
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                {isInStock && <AddToCartButton product={product} />}
                <Button asChild className="w-full" size="lg" variant={isInStock ? "outline" : "default"}>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp ilə sifariş
                  </a>
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Çatdırılma</span>
                  <span className="font-medium">Bakı daxili sürətli çatdırılma</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ödəniş</span>
                  <span className="font-medium">Qapıda nağd</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t bg-muted/30 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-3">VitaminAz</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Vitamin Az (VitaminAz) - Bakıda güvənli onlayn alış-veriş. Keyfiyyətli məhsullar və sürətli çatdırılma.
                </p>
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
                    <a href="/contact" className="text-muted-foreground hover:text-foreground">
                      Bizimlə Əlaqə
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Location</h3>
                <p className="text-sm text-muted-foreground">
                  Serving Baku, Azerbaijan
                  <br />
                    WhatsApp İlə Sifariş
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
