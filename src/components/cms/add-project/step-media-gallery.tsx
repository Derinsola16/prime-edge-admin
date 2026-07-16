"use client"

import { useState } from "react"
import { Plus, ImagePlus } from "lucide-react"

import { Button } from "@/components/ui/button"

const defaultCategories = ["Exterior", "Living Room", "Master's Bedroom", "Kitchen", "Bathrooms"]

export function StepMediaGallery({
  onNext,
  onPrevious,
}: {
  onNext: () => void
  onPrevious: () => void
}) {
  const [categories, setCategories] = useState(defaultCategories)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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

      {categories.map(category => (
        <div key={category} className="space-y-2">
          <p className="text-sm font-medium text-foreground">{category}</p>
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/40"
              >
                <ImagePlus className="size-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      ))}

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
