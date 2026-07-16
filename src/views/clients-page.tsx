"use client"

import Link from "next/link"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Search, Download, SlidersHorizontal, ChevronDown, Eye } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { getClientMetrics, getClients } from "@/services/api/clients"
import { Pagination } from "@/components/shared/pagination"
import { ClientMetrics } from "@/components/clients/client-metrics"
import { KycStatusBadge } from "@/components/clients/kyc-status-badge"
import { KycStatus } from "@/types/client.types"

const filters: { label: string; value: "all" | KycStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
]

export default function ClientsPage() {
  const [filter, setFilter] = useState<"all" | KycStatus>("all")
  const [page, setPage] = useState(1)

  const { data: metricsRes } = useQuery({
    queryKey: ["client-metrics"],
    queryFn: getClientMetrics,
  })
  const { data: clientsRes, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  })

  const clients = (clientsRes?.data.items ?? []).filter(
    c => filter === "all" || c.kyc_status === filter
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Client Management
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

      {metricsRes && <ClientMetrics metrics={metricsRes.data} />}

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Clients</h2>
          <Button variant="link" size="sm" className="text-brand-skyblue">
            See all
          </Button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full bg-muted p-1">
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === f.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
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

        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name title or amount" className="h-10 pl-9" />
          </div>
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            Download CSV
          </Button>
        </div>

        {isLoading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Loading clients…</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="w-8 py-3">
                  <input type="checkbox" className="accent-brand-deepblue" />
                </th>
                <th className="py-3 font-medium">Name &amp; ID</th>
                <th className="py-3 font-medium">Portfolio Value</th>
                <th className="py-3 font-medium">Country</th>
                <th className="py-3 font-medium">KYC Status</th>
                <th className="py-3 font-medium">Join Date</th>
                <th className="w-8 py-3" />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id} className="border-b border-border last:border-0">
                  <td className="py-4">
                    <input type="checkbox" className="accent-brand-deepblue" />
                  </td>
                  <td className="py-4 font-medium text-foreground">{client.name}</td>
                  <td className="py-4 text-foreground">
                    ₦{client.portfolio_value.toLocaleString()}
                  </td>
                  <td className="py-4 text-muted-foreground">{client.country}</td>
                  <td className="py-4">
                    <KycStatusBadge status={client.kyc_status} />
                  </td>
                  <td className="py-4 text-muted-foreground">{client.join_date}</td>
                  <td className="py-4">
                    <Link href={`/clients/${client.id}`}>
                      <Eye className="size-4 text-muted-foreground" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 1-10 of 100 products</p>
          <Pagination page={page} totalPages={10} onPageChange={setPage} />
        </div>
      </div>
    </div>
  )
}
