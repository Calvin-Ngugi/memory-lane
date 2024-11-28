"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { X } from 'lucide-react'

interface Image {
  id: number
  image_url: string
  name: string
  title: string
}

interface ImageModalProps {
  image: Image | null
  onClose: () => void
}

export function ImageModal({ image, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!image) return null

  return (
    <Dialog open={!!image} onOpenChange={onClose}>
    <DialogTitle>{image.title}</DialogTitle>
      <DialogContent className="max-w-2xl p-0">
        <div className="relative">
          <Image
            src={image.image_url}
            alt={image.name}
            width={800}
            height={600}
            className="w-full h-auto"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-opacity"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">{image.title}</h2>
        </div>
      </DialogContent>
    </Dialog>
  )
}

