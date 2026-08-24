"use client"

import Link from "next/link"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { buttonVariants } from "@/components/ui/button"
import { GetPropertiesPayload } from "@/types/property.types"
import { Pagination } from "@/components/shared/pagination"
import { PropertyRow } from "@/components/properties/property-row"
import { PropertyMetrics } from "@/components/properties/property-metrics"
import { getProperties, getPropertyMetrics } from "@/services/api/properties"

const PAGE_SIZE = 10

const filters: { label: string; value: GetPropertiesPayload["filter"] }[] = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Reserved", value: "reserved" },
  { label: "Sold", value: "sold" },
  { label: "Off-Plan", value: "off_plan" },
  { label: "Drafts", value: "drafts" },
]

export default function PropertiesPage() {
  const [filter, setFilter] = useState<GetPropertiesPayload["filter"]>("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const { data: metrics } = useQuery({
    queryKey: ["property-metrics"],
    queryFn: getPropertyMetrics,
  })

  const { data: propertiesRes, isLoading } = useQuery({
    queryKey: ["properties", filter, search, page],
    queryFn: () => getProperties({ filter, search, page, limit: PAGE_SIZE }),
  })

  const properties = propertiesRes?.items ?? []
  const total = propertiesRes?.total ?? 0
  const pages = propertiesRes?.pages ?? 1

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
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

      {metrics && <PropertyMetrics metrics={metrics} />}

      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Properties</h2>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1 rounded-full bg-muted p-1">
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

          <div className="relative w-full sm:w-64">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search properties…"
              className="h-9 pl-9"
              value={search}
              onChange={e => {
                setSearch(e.target.value)
                setPage(1)
              }}
            />
          </div>
        </div>

        {isLoading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Loading properties…
          </p>
        ) : properties.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No properties found{search ? ` for "${search}"` : ""}.
          </p>
        ) : (
          <div>
            {properties.map(property => (
              <PropertyRow key={property.id} property={property} />
            ))}
          </div>
        )}

        {total > 0 && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(page - 1) * PAGE_SIZE + 1}-
              {Math.min(page * PAGE_SIZE, total)} of {total} properties
            </p>

            <Pagination page={page} totalPages={pages} onPageChange={setPage} />
          </div>
        )}
      </div>
    </div>
  )
}
