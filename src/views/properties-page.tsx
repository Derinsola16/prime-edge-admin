"use client"

import Link from "next/link"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { SlidersHorizontal, ChevronDown } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { GetPropertiesPayload } from "@/types/property.types"
import { Pagination } from "@/components/shared/pagination"
import { PropertyRow } from "@/components/properties/property-row"
import { PropertyMetrics } from "@/components/properties/property-metrics"
import { getProperties, getPropertyMetrics } from "@/services/api/properties"

const filters: { label: string; value: GetPropertiesPayload["filter"] }[] = [
  { label: "All", value: "all" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Completed", value: "completed" },
  { label: "Delivered", value: "delivered" },
  { label: "Drafts", value: "drafts" },
]

export default function PropertiesPage() {
  const [filter, setFilter] = useState<GetPropertiesPayload["filter"]>("all")
  const [page, setPage] = useState(1)

  const { data: metricsRes } = useQuery({
    queryKey: ["property-metrics"],
    queryFn: getPropertyMetrics,
  })

  const { data: propertiesRes, isLoading } = useQuery({
    queryKey: ["properties", filter, page],
    queryFn: () => getProperties({ filter, page }),
  })

  const properties = propertiesRes?.data.items ?? []
  const pagination = propertiesRes?.data.pagination

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Property Management
        </h1>

        <Link
          href="/properties/add"
          className={buttonVariants({
            className: "rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover",
          })}
        >
          Create A Property
        </Link>
      </div>

      {metricsRes && <PropertyMetrics metrics={metricsRes.data} />}

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Properties
          </h2>
          <Button variant="link" className="text-brand-skyblue" size="sm">
            See all
          </Button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full bg-muted p-1">
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => {
                  setFilter(f.value)
                  setPage(1)
                }}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === f.value
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm">
            <SlidersHorizontal className="size-4" />
            Customize Columns
            <ChevronDown className="size-4" />
          </Button>
        </div>

        {isLoading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Loading properties…
          </p>
        ) : (
          <div>
            {properties.map(property => (
              <PropertyRow key={property.id} property={property} />
            ))}
          </div>
        )}

        {pagination && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {properties.length ? (page - 1) * 10 + 1 : 0}-
              {(page - 1) * 10 + properties.length} of{" "}
              {/* total not modeled in cursor pagination; fall back to page-based estimate */}
              100 products
            </p>

            <Pagination page={page} totalPages={10} onPageChange={setPage} />
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Discover More Opportunities
        </h2>
        <div className="rounded-xl border border-border bg-card p-6">
          {properties.map(property => (
            <PropertyRow key={`discover-${property.id}`} property={property} />
          ))}
        </div>
      </div>
    </div>
  )
}
