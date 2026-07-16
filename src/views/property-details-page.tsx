"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { Button, buttonVariants } from "@/components/ui/button"
import { getPropertyById } from "@/services/api/properties"
import { PropertyMap } from "@/components/properties/property-map"
import PageLoading from "@/components/shared/page-loading"
import { PropertyRisk } from "@/components/properties/property-risk"
import { PropertyGallery } from "@/components/properties/property-gallery"
import { PropertyOverview } from "@/components/properties/property-overview"
import { InvestmentSummary } from "@/components/properties/investment-summary"
import { PropertyFinancial } from "@/components/properties/property-financial"
import { PropertyAmenities } from "@/components/properties/property-amenities"
import { PropertyFloorPlan } from "@/components/properties/property-floorplan"
import { PropertyQuickFacts } from "@/components/properties/property-quick-facts"
import { PropertyGrowthChart } from "@/components/properties/property-growth-chart"

export default function PropertyDetailsPage({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id),
  })

  const property = data?.data

  if (isLoading || !property) {
    return <PageLoading />
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
        <span className="text-foreground">Property Details</span>
      </nav>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/properties"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <ChevronLeft className="size-5" />
          </Link>
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            {property.name}{" "}
            <span className="text-muted-foreground">
              • {property.estate_name}
            </span>
          </h1>
        </div>

        <Button className="rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover">
          Edit
        </Button>
      </div>

      <PropertyGallery images={property.images} />

      <div className="grid grid-cols-[1fr_380px] gap-6">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {property.name}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              {property.address}
            </p>
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
        </div>

        <InvestmentSummary property={property} />
      </div>
    </div>
  )
}
