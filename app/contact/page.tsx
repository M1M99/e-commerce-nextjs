import type { Metadata } from "next"
import { MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CartButton } from "@/components/cart-button"

export const metadata: Metadata = {
  title: "VitaminAz | Bizimlə Əlaqə - WhatsApp Sifariş",
  description: "VitaminAz əlaqə vasitələri. Bakıda vitaminlərin onlayn sifarişi, suallarınız üçün dəstək və WhatsApp nömrəmiz. Sürətli çatdırılma.",
  keywords: [
    "VitaminAz əlaqə",
    "Vitamin Az nömrə",
    "Bakıda vitamin sifarişi",
    "Onlayn aptek əlaqə",
    "Vitamin.az əlaqə"
  ],
  openGraph: {
    title: "VitaminAz | Bizimlə Əlaqə",
    description: "Sürətli sifariş və dəstək üçün bizə yazın. WhatsApp aktivdir.",
    type: "website",
    locale: "az_AZ",
    url: "https://vitaminaz.vercel.app/contact",
    siteName: "VitaminAz",
  },
  alternates: {
    canonical: "https://vitaminaz.vercel.app/contact",
  },
}

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!
  const whatsappUrl = `https://wa.me/${whatsappNumber}`

  // LocalBusiness Schema SEO üçün
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "vitaminaz",
    description: "Bakıda onlayn vitamin və qida əlavələri mağazası",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baku",
      addressCountry: "AZ",
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || "",
    telephone: `+${whatsappNumber}`,
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: "Baku",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />

      <div className="min-h-screen">
        
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

        <section className="bg-muted/50 border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Bizimlə Əlaqə</h2>
            <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
              Sualınız var? Sifariş vermək istəyirsiniz? WhatsApp vasitəsilə dərhal əlaqə saxlayın.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                      <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <CardTitle>WhatsApp</CardTitle>
                      <CardDescription>Sürətli cavab və asan sifariş</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-pretty">
                     Məhsullar haqqında məlumat almaq və birbaşa sifariş vermək üçün bizə yazın.
                  </p>
                  <Button asChild className="w-full" size="lg">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      WhatsApp-da Yazın
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                      <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle>Ünvan</CardTitle>
                      <CardDescription>Bütün Bakı ərazisinə çatdırılma</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-pretty">
                    <strong>Bakı, Azərbaycan</strong>
                    <br />
                    Şəhər daxili sürətli kuryer çatdırılması mövcuddur.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Niyə Biz?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-semibold">Sürətli Çatdırılma</strong>
                        <p className="text-sm text-muted-foreground text-pretty">
                          Bakı daxili operativ çatdırılma xidməti
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-semibold">Asan Sifariş</strong>
                        <p className="text-sm text-muted-foreground text-pretty">
                          WhatsApp üzərindən rahat sifariş imkanı
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                         <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-semibold">Orijinal Məhsullar</strong>
                        <p className="text-sm text-muted-foreground text-pretty">
                           Yalnız keyfiyyətli və orijinal vitaminlər
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>İş Saatları</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">B.E - Cümə</span>
                      <span className="font-medium">09:00 - 23:00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Şənbə</span>
                      <span className="font-medium">08:00 - 23:00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Bazar</span>
                      <span className="font-medium">08:00 - 23:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/30 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-3">VitaminAz</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Bakıda ən keyfiyyətli onlayn vitamin mağazası. Sürətli çatdırılma və sərfəli qiymətlər.
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
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-muted-foreground hover:text-foreground">
                      Əlaqə
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Ünvan</h3>
                <p className="text-sm text-muted-foreground">
                   Bakı, Azərbaycan
                  <br />
                  WhatsApp İlə Sifariş
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
