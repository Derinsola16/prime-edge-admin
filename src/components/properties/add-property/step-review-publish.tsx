import { UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { AddPropertyFormValues } from "@/types/add-property.types"
import { PropertyMap } from "@/components/properties/property-map"
import { PropertyRisk } from "@/components/properties/property-risk"
import { PropertyGallery } from "@/components/properties/property-gallery"
import { PropertyOverview } from "@/components/properties/property-overview"
import { PropertyFinancial } from "@/components/properties/property-financial"
import { PropertyAmenities } from "@/components/properties/property-amenities"
import { PropertyFloorPlan } from "@/components/properties/property-floorplan"
import { PropertyQuickFacts } from "@/components/properties/property-quick-facts"
import { PropertyGrowthChart } from "@/components/properties/property-growth-chart"
import { buildPreviewFromWizard } from "@/helpers/functions/add-property"

export function StepReviewPublish({
  form,
  onPublish,
  onPrevious,
  isPublishing,
}: {
  form: UseFormReturn<AddPropertyFormValues>
  onPublish: () => void
  onPrevious: () => void
  isPublishing?: boolean
}) {
  const property = buildPreviewFromWizard(form.getValues())

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Section 5 of 5</p>
        <h2 className="text-xl font-semibold text-foreground">
          Review &amp; Publish
        </h2>
      </div>

      <PropertyGallery images={property.images} />

      <div>
        <h3 className="text-lg font-semibold text-foreground">{property.name}</h3>
        <p className="text-sm text-muted-foreground">{property.address}</p>
      </div>

      <PropertyQuickFacts property={property} />
      <PropertyOverview property={property} />
      <PropertyFinancial property={property} />
      <PropertyRisk property={property} />
      <PropertyFloorPlan imageUrl={property.floor_plan_url} />
      <PropertyAmenities amenities={property.amenities} />
      <PropertyGrowthChart
        growth={property.growth}
        overallRevenueLabel={property.overall_revenue_label}
      />
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
          {isPublishing ? "Publishing…" : "Review & Publish"}
        </Button>
      </div>
    </div>
  )
}
