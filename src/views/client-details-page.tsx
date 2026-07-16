"use client"

import Link from "next/link"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  Eye,
  Home,
  Search,
  Download,
  Building2,
  ChevronLeft,
  FileCheck,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { buttonVariants, Button } from "@/components/ui/button"
import PageLoading from "@/components/shared/page-loading"
import { KycStatusBadge } from "@/components/clients/kyc-status-badge"
import { getClientActivity, getClientById, getTransactionDetail } from "@/services/api/clients"
import { TransactionDetailsDrawer } from "@/components/clients/transaction-details-drawer"
import { ActivityStatus } from "@/types/client.types"

const activityStatusClass: Record<ActivityStatus, string> = {
  completed: "border-transparent bg-success/10 text-success",
  pending: "border-orange-400 text-orange-500 bg-transparent",
  failed: "border-transparent bg-destructive/10 text-destructive",
}

export default function ClientDetailsPage({ id }: { id: string }) {
  const [selectedActivity, setSelectedActivity] = useState<string>()

  const { data, isLoading } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getClientById(id),
  })

  const { data: activityRes } = useQuery({
    queryKey: ["client-activity", id],
    queryFn: () => getClientActivity(id),
  })

  const { data: transactionRes } = useQuery({
    queryKey: ["transaction", selectedActivity],
    queryFn: () => getTransactionDetail(selectedActivity!),
    enabled: !!selectedActivity,
  })

  const client = data?.data
  const activities = activityRes?.data.items ?? []

  if (isLoading || !client) {
    return <PageLoading />
  }

  const metricCards = [
    { label: "Total Property", value: client.metrics.total_property, icon: Building2, note: "+0% from last month" },
    { label: "Delivered Home(s)", value: client.metrics.delivered_homes, icon: Home, note: "2 in construction" },
    { label: "Property in Funding", value: client.metrics.property_in_funding, icon: Building2, note: "Currently paying for" },
    { label: "KYC Submitted", value: client.metrics.kyc_submitted, icon: FileCheck, note: "" },
    { label: "Property in Funding", value: client.metrics.property_in_funding, icon: Building2, note: "Currently paying for" },
    { label: "Pending Documents", value: client.metrics.pending_documents, icon: Home, note: "View all", link: true },
  ]

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <span>Investors</span>
        <span>›</span>
        <span>Details</span>
      </nav>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/clients" className={buttonVariants({ variant: "ghost", size: "icon" })}>
            <ChevronLeft className="size-5" />
          </Link>
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            {client.name}
          </h1>
          <span className="size-1.5 rounded-full bg-muted-foreground" />
          <KycStatusBadge status={client.kyc_status} />
        </div>

        <Link
          href={`/clients/${client.id}/kyc`}
          className={buttonVariants({
            className: "rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover",
          })}
        >
          Review KYC
        </Link>
      </div>

      <div className="grid grid-cols-[280px_1fr] gap-6">
        <div className="rounded-xl border border-border bg-secondary p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="relative flex size-14 items-center justify-center rounded-full bg-card text-lg font-semibold text-foreground">
              {client.name.split(" ").map(n => n[0]).join("")}
              <span className="absolute -top-1 -right-1 rounded-full bg-brand-skyblue px-1.5 py-0.5 text-[10px] font-semibold text-white">
                New
              </span>
            </span>
          </div>
          <p className="text-lg font-semibold text-foreground">{client.name}</p>
          <p className="mb-4 text-sm text-muted-foreground">{client.reference}</p>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Contact</p>
              <p className="font-medium text-foreground">{client.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium text-foreground">{client.phone}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium text-foreground">{client.location}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Date Joined</p>
              <p className="font-medium text-foreground">{client.date_joined}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {metricCards.map((card, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
                  <card.icon className="size-4" />
                </span>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-semibold text-foreground">{card.value}</p>
                {card.note && (
                  <p className={cn("text-xs", card.link ? "text-brand-skyblue" : "text-muted-foreground")}>
                    {card.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Funding Project</span>
              <span className="text-muted-foreground">Number of Projects: {client.number_of_projects}</span>
            </div>
            <p className="mb-2 text-lg font-semibold text-brand-deepblue">
              ₦{(client.funding_raised / 1_000_000).toFixed(0)}M of ₦
              {(client.funding_target / 1_000_000).toFixed(0)}M
            </p>
            <Progress value={client.funding_percent} className="h-2" />
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{client.funding_percent}% funding</span>
              <span>{client.months_left} Months left</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <Button variant="link" size="sm" className="text-brand-skyblue">
            See all
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
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

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="py-3 font-medium">Activity</th>
                <th className="py-3 font-medium">Amount</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Execution Date</th>
                <th className="py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => (
                <tr key={activity.id} className="border-b border-border last:border-0">
                  <td className="py-4">
                    <p className="font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
                  </td>
                  <td className="py-4 text-foreground">₦{activity.amount.toLocaleString()}</td>
                  <td className="py-4">
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-xs font-medium",
                        activityStatusClass[activity.status]
                      )}
                    >
                      {activity.status[0].toUpperCase() + activity.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 text-muted-foreground">{activity.execution_date}</td>
                  <td className="py-4">
                    <button onClick={() => setSelectedActivity(activity.id)}>
                      <Eye className="size-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TransactionDetailsDrawer
        open={!!selectedActivity}
        onOpenChange={open => !open && setSelectedActivity(undefined)}
        transaction={transactionRes?.data}
      />
    </div>
  )
}
