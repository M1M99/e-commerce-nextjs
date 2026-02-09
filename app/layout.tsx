// import type React from "react"
// import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
// import { Toaster } from "@/components/ui/toaster"
// import "./globals.css"

// const _geist = Geist({ subsets: ["latin"] })
// const _geistMono = Geist_Mono({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vitaminaz.vercel.app"),
//   title: {
//     default: "VitaminAz | Bakıda Vitamin və Supplement Sifarişi",
//     template: "%s | VitaminAz",
//   },
//   description:
//     "VitaminAz - Bakıda ən keyfiyyətli vitaminlər, saç və dəri baxım vasitələri, idman qidaları. Sürətli çatdırılma və orijinal məhsullar.",
//   keywords: [
//     "vitaminaz",
//     "vitamin sifarişi Bakı",
//     "onlayn aptek",
//     "saç tökülməsinə qarşı",
//     "idman qidaları",
//     "Bakıda vitamin",
//     "vitamin az",
//   ],
//   authors: [{ name: "VitaminAz" }],
//   icons: {
//     icon: "/favicon.ico?v=2",          
//     shortcut: "/favicon.ico?v=2",
//     apple: "/favicon.ico?v=2"
//   },
//   openGraph: {
//     type: "website",
//     locale: "az_AZ", // Dili Azərbaycan dilinə dəyişdik
//     siteName: "VitaminAz",
//     title: "VitaminAz | Bakıda Vitamin və Kosmetika Sifarişi",
//     description:
//       "Orijinal vitaminlər, minerallar və kosmetika məhsulları. Qapıya çatdırılma xidməti.",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "VitaminAz | Bakıda Onlayn Vitamin Mağazası",
//     description: "Sürətli çatdırılma ilə orijinal vitamin və kosmetika sifarişi.",
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   verification: {
//      google: 'MOqHXF6rzDrviIWpnEBB5zyT6kBuOQ5rg6U8La-XI3s',
//   },
//     generator: 'v0.app'
// }

// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "#ffffff" },
//     { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
//   ],
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     // Dili "en" yox, "az" etdik ki, Google Azərbaycan dili olduğunu bilsin
//     <html lang="az"> 
//       <body className={`font-sans antialiased`}>
//         {children}
//         <Toaster />
//         <Analytics />
//       </body>
//     </html>
//   )
// }


import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

// Şriftləri dəyişənlərə (variable) bağlayırıq ki, Tailwind ilə işləsin
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vitaminaz.vercel.app"),
  title: {
    default: "VitaminAz | Bakıda Vitamin və Supplement Sifarişi",
    template: "%s | VitaminAz (Vitamin Az)",
  },
  description:
    "VitaminAz - Bakıda ən keyfiyyətli vitaminlər, saç və dəri baxım vasitələri, idman qidaları. Sürətli çatdırılma və orijinal məhsullar.",
  keywords: [
    "vitaminaz",
    "vitamin az", // Bunu xüsusi əlavə etdik
    "vitamin.az",
    "vitamin sifarişi Bakı",
    "onlayn aptek",
    "saç tökülməsinə qarşı",
    "idman qidaları",
    "Bakıda vitamin",
    "orzax bakı", // Populyar brendlər əlavə etmək faydalıdır
    "solgar bakı",
  ],
  authors: [{ name: "VitaminAz" }],
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.ico?v=2",
  },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    siteName: "VitaminAz",
    title: "VitaminAz | Bakıda Vitamin və Kosmetika Sifarişi",
    description:
      "Orijinal vitaminlər, minerallar və kosmetika məhsulları. Qapıya çatdırılma xidməti.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VitaminAz | Bakıda Onlayn Vitamin Mağazası",
    description: "Sürətli çatdırılma ilə orijinal vitamin və kosmetika sifarişi.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: 'MOqHXF6rzDrviIWpnEBB5zyT6kBuOQ5rg6U8La-XI3s',
  },
  generator: 'v0.app',
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  // Google üçün Strukturlaşdırılmış Məlumat (Schema Markup)
  // Bu hissə "Vitamin Az" (ayrı) axtarışında çıxmaq üçün ən vacib yerdir.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vitaminaz",
    "url": "https://vitaminaz.vercel.app",
    "logo": "https://vitaminaz.vercel.app/favicon.ico",
    "alternateName": ["Vitamin Az", "Vitamin.az", "Vitamin Baku"], // ƏSAS HİSSƏ: Google-a alternativ adları deyirik
    "description": "Bakıda orijinal vitamin və supplementlərin onlayn satışı.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Baku",
      "addressCountry": "AZ"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": "AZ",
      "availableLanguage": ["Azerbaijani", "Russian"]
    }
  };

  return (
    <html lang="az">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {/* JSON-LD Skriptini bura əlavə edirik */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
