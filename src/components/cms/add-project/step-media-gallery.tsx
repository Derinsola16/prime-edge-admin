"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { Plus, ImagePlus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PendingImage } from "@/types/add-property.types"

export type CmsGalleryImage = PendingImage & { category: string }

const defaultCategories = ["Exterior", "Living Room", "Master's Bedroom", "Kitchen", "Bathrooms"]

export function StepMediaGallery({
  images,
  onAdd,
  onRemove,
  onNext,
  onPrevious,
}: {
  images: CmsGalleryImage[]
  onAdd: (category: string, file: File) => void
  onRemove: (index: number) => void
  onNext: () => void
  onPrevious: () => void
}) {
  const [categories, setCategories] = useState(defaultCategories)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">Media Gallery</h3>
          <p className="text-sm text-muted-foreground">
            Organized by category for the website carousel experience.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setCategories(c => [...c, `Category ${c.length + 1}`])}
        >
          Add New Category
          <Plus className="size-4" />
        </Button>
      </div>

      {categories.map(category => {
        const categoryImages = images
          .map((img, index) => ({ img, index }))
          .filter(({ img }) => img.category === category)

        return (
          <div key={category} className="space-y-2">
            <p className="text-sm font-medium text-foreground">{category}</p>
            <input
              ref={el => {
                inputRefs.current[category] = el
              }}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) onAdd(category, file)
                e.target.value = ""
              }}
            />
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
              {categoryImages.map(({ img, index }) => (
                <div key={index} className="group relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={img.previewUrl}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 33vw, 20vw"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => inputRefs.current[category]?.click()}
                className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/40"
              >
                <ImagePlus className="size-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        )
      })}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="h-12 flex-1 rounded-full"
        >
          ← Previous
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="h-12 flex-1 rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
        >
          Proceed to Section C →
        </Button>
      </div>
    </div>
  )
}
