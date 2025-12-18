import { getAllProducts } from "@/lib/sanity-utils"
import { ProductCard } from "@/components/product-card"
import { CartButton } from "@/components/cart-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Online Shopping in Baku, Azerbaijan | Quality Products at Best Prices",
  description:
    "Shop the best products online in Baku, Azerbaijan. Wide selection of electronics, clothing, home goods and more. Fast delivery across Baku. Order via WhatsApp.",
  keywords: "online shopping Baku, Azerbaijan e-commerce, buy online Baku, products Azerbaijan",
  openGraph: {
    title: "Online Shopping in Baku, Azerbaijan",
    description: "Shop quality products online in Baku with fast delivery",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Shopping in Baku, Azerbaijan",
    description: "Shop quality products online in Baku with fast delivery",
  },
  alternates: {
    canonical: "/",
  },
}

export const revalidate = 3600 // ISR: Revalidate every hour

export default async function HomePage() {
  const products = await getAllProducts()
  console.log(products)
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <a href="/">Baku Shop</a>
          </h1>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-primary">
              Products
            </a>
            <a href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </a>
            <CartButton />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-muted/50 border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Quality Products Delivered in Baku</h2>
          <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
            Browse our collection of premium products. Easy ordering via WhatsApp with fast delivery across Baku,
            Azerbaijan.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">All Products</h2>
            <p className="text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"} available
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No products available yet.</p>
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
              <h3 className="font-semibold mb-3">Baku Shop</h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Your trusted online shop in Baku, Azerbaijan. Quality products with fast delivery.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-muted-foreground hover:text-foreground">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Location</h3>
              <p className="text-sm text-muted-foreground">
                Serving Baku, Azerbaijan
                <br />
                WhatsApp ilə sifariş
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Baku Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
