import { Users, FileText, UserCog, UserPlus } from "lucide-react"

import { IAdminMetrics } from "@/types/admin.types"

export function AdminMetrics({ metrics }: { metrics: IAdminMetrics }) {
  const items = [
    { label: "Total Admin", value: metrics.total_admin, icon: Users },
    { label: "Finance Admin", value: metrics.finance_admin, icon: FileText },
    { label: "Client Managers", value: metrics.client_managers, icon: UserCog },
    { label: "Super Admin", value: metrics.super_admin, icon: UserPlus },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map(item => (
        <div
          key={item.label}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-5"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
            <item.icon className="size-5" />
          </span>
          <span>
            <span className="block text-sm text-muted-foreground">{item.label}</span>
            <span className="block text-2xl font-semibold text-foreground">{item.value}</span>
          </span>
        </div>
      ))}
    </div>
  )
}
