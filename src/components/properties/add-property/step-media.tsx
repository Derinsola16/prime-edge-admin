"use client"

import Image from "next/image"
import { useRef } from "react"
import { UseFormReturn } from "react-hook-form"
import { Upload, ImagePlus, Link2, X, LayoutPanelTop } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PendingImage, AddPropertyFormValues } from "@/types/add-property.types"

export function StepMedia({
  form,
  heroImage,
  onHeroChange,
  galleryImages,
  onGalleryAdd,
  onGalleryRemove,
  floorPlanImage,
  onFloorPlanChange,
  onNext,
  onPrevious,
}: {
  form: UseFormReturn<AddPropertyFormValues>
  heroImage: PendingImage | null
  onHeroChange: (file: File | null) => void
  galleryImages: PendingImage[]
  onGalleryAdd: (file: File) => void
  onGalleryRemove: (index: number) => void
  floorPlanImage: PendingImage | null
  onFloorPlanChange: (file: File | null) => void
  onNext: () => void
  onPrevious: () => void
}) {
  const { register } = form
  const heroInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const floorPlanInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Section 3 of 5</p>
        <h2 className="text-xl font-semibold text-foreground">Media</h2>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Hero Image (Main Thumbnail)
        </label>
        <input
          ref={heroInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={e => onHeroChange(e.target.files?.[0] ?? null)}
        />
        <button
          type="button"
          onClick={() => heroInputRef.current?.click()}
          className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/40"
        >
          {heroImage ? (
            <Image
              src={heroImage.previewUrl}
              alt="Hero"
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover"
            />
          ) : (
            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Upload className="size-4" />
              Upload hero image
            </span>
          )}
        </button>
      </div>

      <div className="space-y-1.5">
        <p className="text-sm font-medium text-foreground">Additional Gallery Photos</p>
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) onGalleryAdd(file)
            e.target.value = ""
          }}
        />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {galleryImages.map((img, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={img.previewUrl}
                alt=""
                fill
                sizes="(max-width: 640px) 33vw, 25vw"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => onGalleryRemove(i)}
                className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-brand-skyblue bg-brand-skyblue-ghost text-sm font-medium text-brand-skyblue"
          >
            <ImagePlus className="size-5" />
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Floor Plan</label>
        <input
          ref={floorPlanInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={e => onFloorPlanChange(e.target.files?.[0] ?? null)}
        />
        <button
          type="button"
          onClick={() => floorPlanInputRef.current?.click()}
          className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/40"
        >
          {floorPlanImage ? (
            <Image
              src={floorPlanImage.previewUrl}
              alt="Floor plan"
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover"
            />
          ) : (
            <span className="flex items-center gap-2 text-sm font-medium text-foreground">
              <LayoutPanelTop className="size-4" />
              Upload floor plan
            </span>
          )}
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Virtual Tour link</label>
        <div className="relative">
          <Link2 className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Url here"
            className="h-12 pl-9"
            {...register("virtualTourUrl")}
          />
        </div>
      </div>

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
          Proceed to Section D →
        </Button>
      </div>
    </div>
  )
}
