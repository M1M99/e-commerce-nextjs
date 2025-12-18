"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  mainImage: { url: string; alt: string }
  galleryImages: { url: string; alt?: string }[]
}

export function ImageGallery({ mainImage, galleryImages }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage.url)
  const [selectedAlt, setSelectedAlt] = useState(mainImage.alt)

  const allImages = [mainImage, ...galleryImages]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={selectedImage || "/placeholder.svg"}
          alt={selectedAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImage(image.url)
                setSelectedAlt(image.alt || mainImage.alt)
              }}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md border-2 transition-colors",
                selectedImage === image.url ? "border-primary" : "border-transparent hover:border-muted-foreground/30",
              )}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt || `Product image ${index + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
