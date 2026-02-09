import { getAllProducts } from "@/lib/sanity-utils"
import { ProductCard } from "@/components/product-card"
import { CartButton } from "@/components/cart-button"
import type { Metadata } from "next"
import { Instagram } from "lucide-react"

export const metadata: Metadata = {
  title: "VitaminAz | Bakıda Onlayn Mağaza və Sürətli Çatdırılma",
  description:
    "VitaminAz - Bakıda ən keyfiyyətli vitaminlər, kosmetika və qida əlavələri. Vitamin Azərbaycanda onlayn sifariş, qapıya sürətli çatdırılma və sərfəli qiymətlər.",
  keywords: [
    "VitaminAz",      
    "Vitamin Az",     
    "vitamin az",     
    "vitaminaz",      
    "vitamin.az",     
    "Baku Shop", 
    "Onlayn Aptek",
    "Bakıda Vitamin"
  ].join(", "),
  openGraph: {
    title: "VitaminAz | Bakıda Onlayn Alış-veriş",
    description: "Keyfiyyətli məhsullar, sürətli çatdırılma. İndi sifariş et!",
    type: "website",
    locale: "az_AZ",
    url: "https://vitaminaz.vercel.app",
    siteName: "VitaminAz",
  },
  twitter: {
    card: "summary_large_image",
    title: "VitaminAz | Bakıda Onlayn Mağaza",
    description: "Bakıda vitamin və kosmetika sifarişi. Sürətli çatdırılma.",
  },
  alternates: {
    canonical: "/",
  },
}

export const revalidate = 3600 

export default async function HomePage() {
  const products = await getAllProducts()
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://vitaminaz.vercel.app/#organization",
        "name": "VitaminAz",
        "url": "https://vitaminaz.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://vitaminaz.vercel.app/favicon.ico?v=2",
          "width": 112,
          "height": 112
        },
        "alternateName": ["Baku Shop", "Vitamin az", "Vitamin.az"],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+994709001124",
          "contactType": "customer service",
          "areaServed": "AZ",
          "availableLanguage": ["Azerbaijani", "Russian", "English"]
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://vitaminaz.vercel.app/#website",
        "url": "https://vitaminaz.vercel.app",
        "name": "VitaminAz",
        "description": "Bakıda onlayn alış-veriş və sürətli çatdırılma",
        "publisher": {
          "@id": "https://vitaminaz.vercel.app/#organization"
        },
        "inLanguage": "az-AZ"
      }
    ]
  }
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "994709001124"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Salam, məhsullar haqqında məlumat almaq istəyirəm.`
  return (
    <>
      {/* Schema Kodunu əlavə edirik */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

        {/* Hero Section */}
        <section className="bg-muted/50 border-b">
          <div className="container mx-auto px-4 py-12 md:py-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Keyfiyyətli Məhsul, Sürətli Çatdırılma
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
               Premium məhsul kolleksiyamızla tanış olun. Bakı daxili sürətli çatdırılma və WhatsApp vasitəsilə asan sifariş imkanı.
            </p>
          </div>
        </section>

        <main className="container mx-auto px-4 py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Bütün Məhsullar</h2>
              <p className="text-muted-foreground">
                {products.length} {products.length === 1 ? "məhsul" : "məhsul"} mövcuddur
              </p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">Hələlik məhsul yoxdur.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/30 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-3">VitaminAz</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                    Vitamin Az (VitaminAz) - Bakıda güvənli onlayn alış-veriş. Keyfiyyətli məhsullar və sürətli çatdırılma.
                </p>
                <div className="flex gap-3 mt-2">
                  <a
                    href="https://www.instagram.com/vitaminaz.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram səhifəmiz"
                    className=" flex items-center justify-center w-9 h-9 rounded-full bg-pink-600 hover:bg-pink-700 text-white transition-colors shadow-sm"                  >
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
             <p>&copy; {new Date().getFullYear()} VitaminAz. All rights reserved.</p>
           </div>
          </div>
        </footer>
      </div>
    </>
  )
}
