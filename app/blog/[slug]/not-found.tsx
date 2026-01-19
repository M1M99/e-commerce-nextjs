import Link from "next/link"
import { Metadata } from "next" 

export const metadata: Metadata = {
  title: "Məhsul Tapılmadı | VitaminAz",
  description: "Axtardığınız məhsul tapılmadı. Digər məhsullarımıza nəzər yetirin.",
  robots: {
    index: false, 
    follow: true,
  },
}

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center min-h-[60vh]">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <span className="text-4xl">🔍</span>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-gray-900 font-serif">Blog Tapılmadı</h2>
      <p style={{fontFamily:'sans-serif'}} className="text-muted-foreground mb-8 max-w-md text-lg">
        Axtardığınız blog mövcud deyil, silinib və ya ünvan səhvdir.
      </p>
      <Link 
        href="/" 
        className="font-serif bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
      >
        Ana Səhifəyə Qayıt
      </Link>
    </div>
  )
}