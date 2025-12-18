"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CartItemType {
  _id: string
  title: string
  price: number
  mainImageUrl: string
  mainImageAlt: string
  slug: string
  quantity: number
}

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (_id: string, quantity: number) => void
  onRemove: (_id: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <Link href={`/products/${item.slug}`} className="flex-shrink-0">
        <div className="relative w-20 h-20 rounded overflow-hidden bg-muted">
          <Image
            src={item.mainImageUrl || "/placeholder.svg"}
            alt={item.mainImageAlt}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.slug}`} className="hover:underline">
          <h3 className="font-medium line-clamp-2 text-sm mb-1">{item.title}</h3>
        </Link>
        <p className="text-sm font-semibold mb-2">{item.price} ₼</p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 bg-transparent"
            onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 bg-transparent"
            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 ml-auto text-destructive"
            onClick={() => onRemove(item._id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
