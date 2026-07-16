import { Users, FileCheck, FileText, UserPlus, TrendingUp } from "lucide-react"

import { IClientMetrics } from "@/types/client.types"

export function ClientMetrics({ metrics }: { metrics: IClientMetrics }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-xl border-l-4 border-l-slate-300 border-y border-r border-border bg-card p-5">
        <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
          <Users className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">Total Clients</p>
        <p className="text-2xl font-semibold text-foreground">
          {metrics.total_clients.toLocaleString()}
        </p>
        <p className="flex items-center gap-1 text-xs text-success">
          <TrendingUp className="size-3.5" />
          {metrics.total_clients_growth}
        </p>
      </div>

      <div className="rounded-xl border-l-4 border-l-orange-300 border-y border-r border-border bg-card p-5">
        <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
          <FileText className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">Pending KYC</p>
        <p className="text-2xl font-semibold text-foreground">{metrics.pending_kyc}</p>
      </div>

      <div className="rounded-xl border-l-4 border-l-destructive/50 border-y border-r border-border bg-card p-5">
        <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-success/10 text-success">
          <FileCheck className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">KYC Approved</p>
        <p className="text-2xl font-semibold text-foreground">
          {metrics.kyc_approved.toLocaleString()}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
          <UserPlus className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">Total Properties Funded</p>
        <p className="text-2xl font-semibold text-foreground">
          {metrics.total_properties_funded}
        </p>
        <p className="text-xs text-muted-foreground">15 sign ups last week</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
          <UserPlus className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">Total Sign ups</p>
        <p className="text-2xl font-semibold text-foreground">
          {metrics.total_signups.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">15 sign ups last week</p>
      </div>
    </div>
  )
}
