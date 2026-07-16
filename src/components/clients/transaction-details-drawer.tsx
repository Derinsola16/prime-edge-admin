"use client"

import { Download, CreditCard } from "lucide-react"

import { Progress } from "@/components/ui/progress"
import { ITransactionDetail } from "@/types/client.types"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  )
}

export function TransactionDetailsDrawer({
  open,
  onOpenChange,
  transaction,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction?: ITransactionDetail
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
                <CreditCard className="size-4" />
              </span>
              <SheetTitle>Transaction Details</SheetTitle>
            </div>
            <button className="flex size-9 items-center justify-center rounded-full border border-border">
              <Download className="size-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Here is the full details about the transaction.
          </p>
        </SheetHeader>

        {transaction && (
          <div className="space-y-5 rounded-xl bg-secondary p-5">
            <div>
              <p className="text-sm text-muted-foreground">Payment made</p>
              <p className="text-3xl font-semibold text-brand-deepblue">
                ₦{transaction.amount.toLocaleString()}
              </p>
              <span className="mt-1 inline-block rounded-full bg-card px-3 py-1 text-xs font-medium text-foreground">
                {transaction.payment_plan}
              </span>
            </div>

            <div className="space-y-2 rounded-lg bg-card p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Funding Progress</span>
                <span className="text-brand-deepblue">
                  ₦{(transaction.funding_raised / 1_000_000).toFixed(0)}M of ₦
                  {(transaction.funding_target / 1_000_000).toFixed(0)}M
                </span>
              </div>
              <Progress value={transaction.funding_percent} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{transaction.funding_percent}%</span>
                <span>Payment Complete</span>
              </div>
            </div>

            <Row label="Account name" value={transaction.account_name} />
            <Row label="Paid To" value={transaction.paid_to} />
            <Row label="Payment Type" value={transaction.payment_type} />
            <Row label="Property" value={transaction.property} />
            <Row label="Reference Number" value={transaction.reference_number} />
            <Row label="Payment Option" value={transaction.payment_option} />
            <div>
              <p className="text-sm text-muted-foreground">Payment Status</p>
              <span className="mt-1 inline-block rounded-full border border-success px-3 py-1 text-xs font-medium text-success">
                {transaction.payment_status}
              </span>
            </div>
            <Row label="Date" value={transaction.date} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
