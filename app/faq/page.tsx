import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CartButton } from "@/components/cart-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchBar } from "@/components/search-bar"
import { getAllProducts } from "@/lib/sanity-utils"
import { Instagram } from "lucide-react"

export const metadata = {
  title: "Tez-tez Verilən Suallar (FAQ) | VitaminAz",
  description: "VitaminAz - Çatdırılma, ödəniş və məhsullar haqqında ən çox verilən suallar və cavablar. Sizə necə kömək edə bilərik?",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Tez-tez Verilən Suallar (FAQ) | VitaminAz",
    description: "Sifariş, çatdırılma və məhsullar haqqında bütün suallarınıza cavab tapın.",
    type: "website",
    url: "https://vitaminaz.vercel.app/faq",
    siteName: "VitaminAz",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | VitaminAz - Bizə Sual Verin",
    description: "Çatdırılma və ödəniş haqqında məlumat.",
  },
}

export default async function FAQPage() {
  const products = await getAllProducts()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Səhifə",
        "item": "https://vitaminaz.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "FAQ",
        "item": "https://vitaminaz.vercel.app/faq"
      }
    ]
  }



  const faqs = [
    {
      question: "Sifariş necə verilir?",
      answer: "Saytımızda bəyəndiyiniz məhsulu səbətə əlavə edərək 'WhatsApp İlə Sifariş Et' düyməsinə klikləyə bilərsiniz. Həmçinin birbaşa saytdakı WhatsApp düyməsindən bizə yazaraq sifarişinizi rəsmiləşdirə bilərsiniz."
    },
    {
      question: "Çatdırılma nə qədər vaxt aparır?",
      answer: "Bakı daxilində çatdırılma adətən həmin gün və ya növbəti iş günü həyata keçirilir. Təcili çatdırılma lazım olduqda bizimlə əlaqə saxlaya bilərsiniz."
    },
    {
      question: "Ödəniş necə edilir?",
      answer: "Hazırda ödənişlər yalnız məhsulu təslim alarkən (qapıda) nağd və ya kartla (kuryerə) həyata keçirilir."
    },
    {
      question: "Məhsullar orijinaldır?",
      answer: "Bəli, VitaminAz-da satılan bütün məhsullar rəsmi təchizatçılardan alınır və 100% orijinaldır. Hər bir məhsulun keyfiyyətinə zəmanət veririk."
    },
    {
      question: "Rayonlara çatdırılma var?",
      answer: "Bəli, Azərbaycanın bütün rayonlarına poçt vasitəsilə və ya şəhərlərarası taksi xidmətləri ilə çatdırılma mümkündür."
    },
    {
      question: "Müştəri xidmətləriniz hansı saatlarda işləyir?",
      answer: "Sifarişlərinizi saytımızdan 7/24 onlayn verə bilərsiniz. WhatsApp dəstək xəttimiz isə Həftəiçi 09:00 - 21:00 arası aktivdir və mesajlarınıza ən qısa zamanda cavab verilir."
    },
    {
      question: "Geri qaytarma və dəyişdirmə mümkündür?",
      answer: "Məhsulun qablaşdırması açılmayıbsa və zədələnməyibsə, 14 gün ərzində dəyişdirmə mümkün deyil. Gigiyenik və qida əlavələri olduğu üçün qablaşdırması açılmış məhsullar geri qaytarılmır."
    },
    {
      question: "Məhsulların son istifadə tarixinə necə nəzarət edilir?",
      answer: "Bütün qida əlavələrinin və vitaminlərin son istifadə tarixləri anbarımıza daxil olarkən və sifarişiniz qablaşdırılarkən diqqətlə yoxlanılır. Sizə yalnız uzun istifadə müddəti olan və keyfiyyət standartlarına cavab verən məhsullar göndərilir."
    }
  ]
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "994709001124"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Salam, FAQ səhifəsindən yazıram, sualım var.`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-background sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold">
              <a href="/">VitaminAz</a>
            </div>
            <nav className="flex items-center gap-6">
              <SearchBar products={products} />
              <a href="/" className="text-sm font-medium hover:text-primary hidden sm:flex">
                Məhsullar
              </a>
              <a href="/contact" className="text-sm font-medium hover:text-primary">
                Əlaqə
              </a>
              <ThemeToggle />
              <CartButton />
            </nav>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Tez-tez Verilən Suallar</h1>
            <p className="text-muted-foreground">
              Sualınız var? Aşağıdakı cavablara baxın və ya bizimlə birbaşa əlaqə saxlayın.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-base md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 p-8 bg-muted/50 rounded-2xl text-center border">
            <h3 className="text-xl font-semibold mb-2">Başqa sualınız qaldı?</h3>
            <p className="text-muted-foreground mb-6">
              WhatsApp vasitəsilə bizə yazın, sizə dərhal kömək edək.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              WhatsApp İlə Bizə Yazın
            </a>
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
                <div className="flex gap-3 mt-2">
                  <a
                    href="https://www.instagram.com/vitaminaz.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-pink-600 hover:bg-pink-700 text-white transition-colors shadow-sm"
                  >
                    <Instagram className="w-5 h-5 text-white" />
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
                    <a href="/faq" className="text-muted-foreground hover:text-foreground font-medium text-foreground">
                      FAQ (Tez-tez verilən suallar)
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
