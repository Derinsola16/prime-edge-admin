import {
  Wallet,
  Users,
  UserX,
  UserPlus,
  Clock,
  Search,
  CreditCard,
  TrendingUp,
} from "lucide-react"

import { IAnalyticsMetrics } from "@/types/analytics.types"

function formatNaira(value: number) {
  if (value >= 1_000_000_000) return `₦${(value / 1_000_000_000).toFixed(1)}B`
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`
  return `₦${value.toLocaleString()}`
}

export function AnalyticsMetrics({ metrics }: { metrics: IAnalyticsMetrics }) {
  const items = [
    {
      label: "Total Properties Worth",
      value: formatNaira(metrics.total_properties_worth),
      icon: Wallet,
      note: metrics.total_properties_growth,
      noteTone: "success",
    },
    { label: "Active Clients", value: metrics.active_clients.toLocaleString(), icon: Users },
    {
      label: "Inactive Clients",
      value: formatNaira(metrics.inactive_clients),
      icon: UserX,
    },
    { label: "Total Sign Ups", value: metrics.total_signups.toLocaleString(), icon: UserPlus },
    { label: "Avg Time Spent on Website", value: metrics.avg_time_spent, icon: Clock },
    { label: "Website Visitors", value: metrics.website_visitors.toLocaleString(), icon: Search },
    { label: "On-Time Payment Ratio", value: metrics.on_time_payment_ratio, icon: CreditCard },
    {
      label: "Inflow",
      value: formatNaira(metrics.inflow),
      icon: TrendingUp,
      note: metrics.inflow_growth,
      noteTone: "success",
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map(item => (
        <div
          key={item.label}
          className="rounded-xl border border-border bg-card p-5"
        >
          <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
            <item.icon className="size-4" />
          </span>
          <p className="text-sm text-muted-foreground">{item.label}</p>
          <p className="text-2xl font-semibold text-foreground">{item.value}</p>
          {item.note && <p className="text-xs text-success">↗ {item.note}</p>}
        </div>
      ))}
    </div>
  )
}
