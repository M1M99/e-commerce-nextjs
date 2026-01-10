import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/sanity-utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isInStock = product.availability === "inStock"

  return (
    <Link href={`/products/${product.slug.current}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.mainImageUrl || "/placeholder.svg"}
            alt={product.mainImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
          {!isInStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <Badge variant="destructive" className="text-sm">
                Əldə Yoxdu
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 text-balance">{product.title}</h3>
          {product.metaDescription && (
            <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{product.metaDescription}</p>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <span className="text-2xl font-bold">{product.price} ₼</span>
          {isInStock && (
            <Badge variant="secondary" className="text-xs">
              Mövcuddur
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
