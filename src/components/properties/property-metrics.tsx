import { Wallet, Home, Building2, KeyRound } from "lucide-react"

import { IPropertyMetrics } from "@/types/property.types"

export function PropertyMetrics({
  metrics,
}: {
  metrics: IPropertyMetrics
}) {
  const items = [
    {
      label: "Total Properties",
      value: metrics.total_properties,
      icon: Wallet,
    },
    {
      label: "Completed Projects",
      value: metrics.completed_projects,
      icon: Home,
    },
    {
      label: "Ongoing Projects",
      value: metrics.ongoing_projects,
      icon: Building2,
    },
    {
      label: "Delivered Homes",
      value: metrics.delivered_homes,
      icon: KeyRound,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map(item => (
        <div
          key={item.label}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-5"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
            <item.icon className="size-5" />
          </span>
          <span>
            <span className="block text-sm text-muted-foreground">
              {item.label}
            </span>
            <span className="block text-2xl font-semibold text-foreground">
              {item.value}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}
