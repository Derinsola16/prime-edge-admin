import { TrendingUp, TrendingDown, Repeat, CreditCard, Wallet } from "lucide-react"

import { IFinanceMetrics } from "@/types/finance.types"

function formatNaira(value: number) {
  if (value >= 1_000_000_000) return `₦${(value / 1_000_000_000).toFixed(1)}B`
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`
  return `₦${value.toLocaleString()}`
}

export function FinanceMetrics({ metrics }: { metrics: IFinanceMetrics }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="rounded-xl border-l-4 border-l-success border-y border-r border-border bg-card p-5">
        <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
          <Repeat className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">Gross Capital Inflow</p>
        <p className="text-2xl font-semibold text-foreground">
          {formatNaira(metrics.gross_capital_inflow)}
        </p>
        <p className="flex items-center gap-1 text-xs text-success">
          <TrendingUp className="size-3.5" />
          +12.4% from last month
        </p>
      </div>

      <div className="rounded-xl border-l-4 border-l-orange-300 border-y border-r border-border bg-card p-5">
        <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
          <Wallet className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">Pending Installments</p>
        <p className="text-2xl font-semibold text-foreground">
          {formatNaira(metrics.pending_installments)}
        </p>
        <p className="text-xs text-muted-foreground">
          {metrics.pending_installments_count} transactions to be settled
        </p>
      </div>

      <div className="rounded-xl border-l-4 border-l-destructive/50 border-y border-r border-border bg-card p-5">
        <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
          <CreditCard className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">Total Payouts</p>
        <p className="text-2xl font-semibold text-foreground">
          {formatNaira(metrics.total_payouts)}
        </p>
        <p className="flex items-center gap-1 text-xs text-destructive">
          <TrendingDown className="size-3.5" />
          {metrics.payout_ratio_note}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-success/10 text-success">
          <Wallet className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">Platform Revenue</p>
        <p className="text-2xl font-semibold text-foreground">
          {formatNaira(metrics.platform_revenue)}
        </p>
        <p className="text-xs text-muted-foreground">{metrics.platform_revenue_note}</p>
      </div>
    </div>
  )
}
