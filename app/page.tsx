import { getAllProducts } from "@/lib/sanity-utils"
import { ProductCard } from "@/components/product-card"
import { CartButton } from "@/components/cart-button"
import type { Metadata } from "next"

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
                  Bakıda güvənli onlayn alış-veriş. Keyfiyyətli məhsullar və sürətli çatdırılma.
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
