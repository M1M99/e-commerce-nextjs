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
//     default: "VitaminAz | Online Shopping in Baku, Azerbaijan",
//     template: "%s | VitaminAz",
//   },
//   description:
//     "VitaminAz is an online shopping platform in Baku, Azerbaijan. Buy electronics, clothing, home goods and more with fast delivery and easy WhatsApp ordering.",
//   keywords: [
//     "vitaminaz",
//     "online shopping Baku",
//     "Azerbaijan e-commerce",
//     "buy online Azerbaijan",
//     "Baku online store",
//     "WhatsApp shopping Azerbaijan",
//   ],
//   authors: [{ name: "VitaminAz" }],
//   icons: {
//     icon: "/favicon.ico?v=2",          
//     shortcut: "/favicon.ico?v=2",
//     apple: "/favicon.ico?v=2"
//   },
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     siteName: "VitaminAz",
//     title: "VitaminAz | Online Shopping in Baku, Azerbaijan",
//     description:
//       "Shop quality products online in Baku with fast delivery and easy WhatsApp ordering.",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "VitaminAz | Online Shopping in Baku, Azerbaijan",
//     description: "Shop quality products online in Baku with easy WhatsApp ordering",
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
//     // yandex: 'your-yandex-verification-code',
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
//     <html lang="en">
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

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vitaminaz.vercel.app"),
  title: {
    default: "VitaminAz | Bakıda Vitamin və Supplement Sifarişi",
    template: "%s | VitaminAz",
  },
  description:
    "VitaminAz - Bakıda ən keyfiyyətli vitaminlər, saç və dəri baxım vasitələri, idman qidaları. Sürətli çatdırılma və orijinal məhsullar.",
  keywords: [
    "vitaminaz",
    "vitamin sifarişi Bakı",
    "onlayn aptek",
    "saç tökülməsinə qarşı",
    "idman qidaları",
    "Bakıda vitamin",
    "vitamin az",
  ],
  authors: [{ name: "VitaminAz" }],
  icons: {
    icon: "/favicon.ico?v=2",          
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.ico?v=2"
  },
  openGraph: {
    type: "website",
    locale: "az_AZ", // Dili Azərbaycan dilinə dəyişdik
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
    generator: 'v0.app'
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
  return (
    // Dili "en" yox, "az" etdik ki, Google Azərbaycan dili olduğunu bilsin
    <html lang="az"> 
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
