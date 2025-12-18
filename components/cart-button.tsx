"use client"

import { useState, useEffect } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CartItem } from "@/components/cart-item"

interface CartItemType {
  _id: string
  title: string
  price: number
  mainImageUrl: string
  mainImageAlt: string
  slug: string
  quantity: number
}

export function CartButton() {
  const [cart, setCart] = useState<CartItemType[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load cart from localStorage
    const loadCart = () => {
      const existingCart = localStorage.getItem("cart")
      if (existingCart) {
        setCart(JSON.parse(existingCart))
      }
    }

    loadCart()

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCart()
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => window.removeEventListener("cartUpdated", handleCartUpdate)
  }, [])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const updateQuantity = (_id: string, newQuantity: number) => {
    const updatedCart = cart
      .map((item) => (item._id === _id ? { ...item, quantity: newQuantity } : item))
      .filter((item) => item.quantity > 0)

    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const removeItem = (_id: string) => {
    const updatedCart = cart.filter((item) => item._id !== _id)
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("cart")
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "994709001124"
  const orderMessage = cart
    .map((item) => `${item.title} x${item.quantity} - ${item.price * item.quantity} AZN`)
    .join("\n")
  const whatsappMessage = encodeURIComponent(
    `Salam! Sifariş Etmək İstəyirəm:\n\n${orderMessage}\n\nCəmi: ${totalPrice.toFixed(2)} AZN`,
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg p-3">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full pt-6">
          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>{totalPrice.toFixed(2)} ₼</span>
                </div>

                <Button asChild className="w-full" size="lg">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Order via WhatsApp
                  </a>
                </Button>

                <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
