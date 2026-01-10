"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/sanity-utils"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { toast } = useToast()

  const addToCart = () => {
    setIsAdding(true)

    // Get existing cart from localStorage
    const existingCart = localStorage.getItem("cart")
    const cart = existingCart ? JSON.parse(existingCart) : []

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex((item: any) => item._id === product._id)

    if (existingItemIndex > -1) {
      // Increment quantity
      cart[existingItemIndex].quantity += 1
    } else {
      // Add new item
      cart.push({
        _id: product._id,
        title: product.title,
        price: product.price,
        mainImageUrl: product.mainImageUrl,
        mainImageAlt: product.mainImageAlt,
        slug: product.slug.current,
        quantity: 1,
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    window.dispatchEvent(new Event("cartUpdated"))

    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })

    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <Button onClick={addToCart} disabled={isAdding} className="w-full" size="lg">
        {isAdding ? "Əlavə edilir..." : "Səbətə At"}
    </Button>
  )
}
