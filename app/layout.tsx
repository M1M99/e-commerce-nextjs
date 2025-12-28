import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.vercel.app"),
  title: {
    default: "Online Shopping in Baku, Azerbaijan | Baku Shop",
    template: "%s | Baku Shop",
  },
  description:
    "Shop quality products online in Baku, Azerbaijan. Electronics, clothing, home goods and more. Easy WhatsApp ordering with fast delivery across Baku.",
  keywords: [
    "online shopping Baku",
    "Azerbaijan e-commerce",
    "buy online Azerbaijan",
    "Baku online store",
    "WhatsApp shopping Azerbaijan",
  ],
  authors: [{ name: "Baku Shop" }],
  icons: {
    icon: "/favicon.ico?v=2",          
    shortcut: "favicon-v2.ico",
    apple: "favicon-v2.ico"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Baku Shop",
    title: "Online Shopping in Baku, Azerbaijan",
    description: "Shop quality products online in Baku with easy WhatsApp ordering",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Shopping in Baku, Azerbaijan",
    description: "Shop quality products online in Baku with easy WhatsApp ordering",
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
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
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
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
