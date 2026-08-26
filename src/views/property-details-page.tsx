"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { getPropertyById } from "@/services/api/properties"
import { PropertyMap } from "@/components/properties/property-map"
import PageLoading from "@/components/shared/page-loading"
import { ListingSummary } from "@/components/properties/listing-summary"
import { PropertyGallery } from "@/components/properties/property-gallery"
import { PropertyPricing } from "@/components/properties/property-pricing"
import { PropertyOverview } from "@/components/properties/property-overview"
import { PropertyFeatures } from "@/components/properties/property-features"
import { PropertyFloorPlan } from "@/components/properties/property-floorplan"
import { PropertyQuickFacts } from "@/components/properties/property-quick-facts"
import {
  formatNaira,
  getPropertyStatusClassName,
  getPropertyStatusLabel,
} from "@/helpers/functions/property"

export default function PropertyDetailsPage({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id),
    retry: false,
  })

  const property = data?.data

  if (isLoading) {
    return <PageLoading />
  }

  if (isError || !property) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-lg font-semibold text-foreground">Property not found</p>
        <Link href="/properties" className={buttonVariants({ className: "rounded-full" })}>
          Back to Property Manager
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/properties" className="hover:text-foreground">
          Property Manager
        </Link>
        <span>/</span>
        <span className="truncate text-foreground">{property.name}</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Link
            href="/properties"
            className={buttonVariants({ variant: "ghost", size: "icon", className: "shrink-0" })}
          >
            <ChevronLeft className="size-5" />
          </Link>
          <h1 className="truncate font-heading text-xl font-semibold text-foreground sm:text-2xl">
            {property.name}{" "}
            {property.project && (
              <span className="text-muted-foreground">• {property.project.title}</span>
            )}
          </h1>
        </div>

        <Badge
          variant="outline"
          className={cn("shrink-0 rounded-full text-xs font-medium", getPropertyStatusClassName(property.status))}
        >
          {getPropertyStatusLabel(property.status)}
        </Badge>
      </div>

      <PropertyGallery images={property.images} propertyId={property.id} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{property.name}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              {property.address}
            </p>
            <p className="mt-1 text-lg font-semibold text-brand-deepblue">
              {property.priceLabel || formatNaira(property.price)}
            </p>
          </div>

          <PropertyQuickFacts property={property} />
          <PropertyOverview property={property} />
          <PropertyPricing property={property} />
          <PropertyFloorPlan imageUrl={property.floorPlan?.url} propertyId={property.id} />
          <PropertyFeatures features={property.features} />
          <PropertyMap address={property.address} />
        </div>

        <ListingSummary property={property} />
      </div>
    </div>
  )
}
