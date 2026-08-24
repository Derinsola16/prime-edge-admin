import { Building2, CheckCircle2, FileEdit, Layers } from "lucide-react"

import { IPropertyMetrics } from "@/types/property.types"

export function PropertyMetrics({ metrics }: { metrics: IPropertyMetrics }) {
  const items = [
    {
      label: "Total Properties",
      value: metrics.total_properties,
      icon: Layers,
    },
    {
      label: "Published",
      value: metrics.published,
      icon: CheckCircle2,
    },
    {
      label: "Available",
      value: metrics.available,
      icon: Building2,
    },
    {
      label: "Drafts",
      value: metrics.drafts,
      icon: FileEdit,
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
