import { Wallet, Home, Building2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { IDashboardMetrics } from "@/types/dashboard.types"

export function DashboardMetrics({ metrics }: { metrics: IDashboardMetrics }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="rounded-xl border-l-4 border-l-success border-y border-r border-border bg-card p-5">
        <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
          <Wallet className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">Total Capital Deployed</p>
        <p className="text-2xl font-semibold text-foreground">
          ₦{(metrics.total_capital_deployed / 1_000_000_000).toFixed(1)}B
        </p>
        <p className="text-xs text-success">↗ {metrics.total_capital_growth}</p>
      </div>

      <div className="rounded-xl border-l-4 border-l-brand-skyblue border-y border-r border-border bg-card p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
            <Home className="size-4" />
          </span>
          <Badge className="rounded-full border-transparent bg-brand-skyblue-ghost text-brand-deepblue">
            {metrics.new_investors_badge}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Total Investors</p>
        <p className="text-2xl font-semibold text-foreground">{metrics.total_investors}</p>
        <p className="text-xs text-muted-foreground">{metrics.investors_note}</p>
      </div>

      <div className="rounded-xl border-l-4 border-l-destructive/50 border-y border-r border-border bg-card p-5">
        <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
          <Home className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">Pending Tasks</p>
        <p className="text-2xl font-semibold text-foreground">{metrics.pending_tasks}</p>
        <p className="text-xs text-muted-foreground">{metrics.pending_tasks_note}</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
            <Building2 className="size-4" />
          </span>
          <Badge className="rounded-full border-transparent bg-success/10 text-success">
            {metrics.active_projects_badge}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Active Projects</p>
        <p className="text-2xl font-semibold text-foreground">{metrics.active_projects}</p>
        <p className="text-xs text-muted-foreground">{metrics.active_projects_note}</p>
      </div>
    </div>
  )
}
