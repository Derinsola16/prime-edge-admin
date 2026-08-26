import Image from "next/image"
import { useRef } from "react"
import { UseFormReturn } from "react-hook-form"
import { FileText, Upload } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PendingImage } from "@/types/add-property.types"
import { AddCmsProjectFormValues, CmsProjectStatusInput } from "@/types/add-cms-project.types"
import { BoxedRadioOption } from "@/components/properties/add-property/boxed-option"

const STATUS_OPTIONS: { value: CmsProjectStatusInput; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
]

export function StepBasicInfo({
  form,
  heroImage,
  onHeroChange,
  onNext,
}: {
  form: UseFormReturn<AddCmsProjectFormValues>
  heroImage: PendingImage | null
  onHeroChange: (file: File | null) => void
  onNext: () => void
}) {
  const { register, watch, setValue } = form
  const category = watch("category")
  const status = watch("status")
  const heroInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Project Name</label>
          <Input placeholder="E.g The Haven" className="h-12" {...register("project_name")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Tagline</label>
          <Input
            placeholder="E.g A private location, thoughtfully created for refined urban living"
            className="h-12"
            {...register("tagline")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Estimated Delivery</label>
          <Input placeholder="E.g Q4 2026" className="h-12" {...register("estimated_delivery")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Location</label>
          <Input placeholder="Location" className="h-12" {...register("location")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Hero Image</label>
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
          className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/40"
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
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="size-4" />
              Upload hero image
            </span>
          )}
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Overview</label>
        <Textarea rows={5} {...register("overview")} />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Category</label>
        <div className="flex flex-wrap gap-4">
          <BoxedRadioOption
            label="Residential"
            checked={category === "residential"}
            onSelect={() => setValue("category", "residential")}
          />
          <BoxedRadioOption
            label="Commercial"
            checked={category === "commercial"}
            onSelect={() => setValue("category", "commercial")}
          />
          <BoxedRadioOption
            label="Mixed Use"
            checked={category === "mixed_use"}
            onSelect={() => setValue("category", "mixed_use")}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Project Status</label>
        <div className="flex flex-wrap gap-4">
          {STATUS_OPTIONS.map(option => (
            <BoxedRadioOption
              key={option.value}
              label={option.label}
              checked={status === option.value}
              onSelect={() => setValue("status", option.value)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Full Address</label>
          <Input placeholder="Address" className="h-12" {...register("full_address")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Construction Progress (%)</label>
          <Input
            type="number"
            min={0}
            max={100}
            placeholder="E.g 75"
            className="h-12"
            {...register("construction_progress")}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-sm font-medium text-foreground">Brochure</p>
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-10 opacity-60">
          <FileText className="size-6 text-muted-foreground" />
          <p className="text-sm font-semibold text-foreground">Coming soon</p>
          <p className="text-xs text-muted-foreground">PDF brochure uploads aren&apos;t supported yet</p>
        </div>
      </div>

      <Button
        type="button"
        onClick={onNext}
        className="h-12 w-full rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
      >
        Proceed to Section B →
      </Button>
    </div>
  )
}
