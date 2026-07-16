"use client"

import { useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { Upload, ImagePlus, Link2, FileText, Scale, Grid2x2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AddPropertyFormValues } from "@/types/add-property.types"

const legalDocs = [
  { id: "deed", label: "Deed of Assignment", meta: "PDF 15MB", icon: FileText, tint: "bg-orange-100 text-orange-500" },
  { id: "contract", label: "Investment Contract", meta: "PDF 15MB", icon: Scale, tint: "bg-brand-skyblue-ghost text-brand-deepblue" },
  { id: "floorplans", label: "Building floor Plans", meta: "PDF 15MB", icon: Grid2x2, tint: "bg-success/10 text-success" },
]

export function StepMediaDocs({
  form,
  onNext,
  onPrevious,
}: {
  form: UseFormReturn<AddPropertyFormValues>
  onNext: () => void
  onPrevious: () => void
}) {
  const { register } = form
  const [galleryCount, setGalleryCount] = useState(3)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Section 3 of 5</p>
        <h2 className="text-xl font-semibold text-foreground">
          Media &amp; Documents
        </h2>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Hero Image (Main Thumbnail)
        </label>
        <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40">
          <Button type="button" variant="secondary">
            <Upload className="size-4" />
            Upload
          </Button>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-sm font-medium text-foreground">
          Additional Gallery Photos
        </p>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: galleryCount }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/40"
            >
              <ImagePlus className="size-5 text-muted-foreground" />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setGalleryCount(c => c + 1)}
            className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-brand-skyblue bg-brand-skyblue-ghost text-sm font-medium text-brand-skyblue"
          >
            + Add more
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Virtual Tour link
        </label>
        <div className="relative">
          <Link2 className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Url here"
            className="h-12 pl-9"
            {...register("virtual_tour_link")}
          />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Legal Documents</p>
        {legalDocs.map(doc => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-lg border border-border p-4"
          >
            <div className="flex items-center gap-3">
              <span className={`flex size-10 items-center justify-center rounded-lg ${doc.tint}`}>
                <doc.icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{doc.label}</p>
                <p className="text-xs text-muted-foreground">{doc.meta}</p>
              </div>
            </div>
            <Button type="button" variant="outline" size="sm">
              Browse files
            </Button>
          </div>
        ))}
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
