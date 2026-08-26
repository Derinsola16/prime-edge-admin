import { UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { PendingImage, AddPropertyFormValues } from "@/types/add-property.types"
import { PRODUCT_STATUS_OPTIONS } from "@/types/property.types"
import { IProjectOption } from "@/services/api/properties"
import { PropertyMap } from "@/components/properties/property-map"
import { PropertyGallery } from "@/components/properties/property-gallery"
import { PropertyPricing } from "@/components/properties/property-pricing"
import { PropertyOverview } from "@/components/properties/property-overview"
import { PropertyFeatures } from "@/components/properties/property-features"
import { PropertyFloorPlan } from "@/components/properties/property-floorplan"
import { PropertyQuickFacts } from "@/components/properties/property-quick-facts"
import { buildPropertyPreview } from "@/helpers/functions/add-property"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function StepReviewPublish({
  form,
  projects,
  heroImage,
  galleryImages,
  floorPlanImage,
  onPublish,
  onPrevious,
  isPublishing,
}: {
  form: UseFormReturn<AddPropertyFormValues>
  projects: IProjectOption[]
  heroImage: PendingImage | null
  galleryImages: PendingImage[]
  floorPlanImage: PendingImage | null
  onPublish: () => void
  onPrevious: () => void
  isPublishing?: boolean
}) {
  const values = form.watch()
  const selectedProject = projects.find(p => p.id === values.projectId)
  const imagePreviewUrls = [heroImage, ...galleryImages]
    .filter((img): img is PendingImage => img !== null)
    .map(img => img.previewUrl)

  const property = buildPropertyPreview(
    values,
    selectedProject,
    imagePreviewUrls,
    floorPlanImage?.previewUrl ?? null
  )

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Section 5 of 5</p>
        <h2 className="text-xl font-semibold text-foreground">
          Review &amp; Publish
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-muted/30 p-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Listing Status</label>
          <Select
            value={values.status}
            onValueChange={v =>
              v && form.setValue("status", v as AddPropertyFormValues["status"])
            }
          >
            <SelectTrigger className="h-11 w-full bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_STATUS_OPTIONS.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <label className="flex items-center gap-2 self-end pb-2.5">
          <Checkbox
            checked={values.publishNow}
            onCheckedChange={checked => form.setValue("publishNow", checked === true)}
          />
          <span className="text-sm font-medium text-foreground">
            Publish immediately (visible on the website)
          </span>
        </label>
      </div>

      <PropertyGallery images={property.images} />

      <div>
        <h3 className="text-lg font-semibold text-foreground">{property.name}</h3>
        <p className="text-sm text-muted-foreground">{property.address}</p>
      </div>

      <PropertyQuickFacts property={property} />
      <PropertyOverview property={property} />
      <PropertyPricing property={property} />
      <PropertyFloorPlan imageUrl={property.floorPlan?.url} />
      <PropertyFeatures features={property.features} />
      <PropertyMap address={property.address} />

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
          onClick={onPublish}
          disabled={isPublishing}
          className="h-12 flex-1 rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
        >
          {isPublishing ? "Saving…" : values.publishNow ? "Publish Property" : "Save as Draft"}
        </Button>
      </div>
    </div>
  )
}
