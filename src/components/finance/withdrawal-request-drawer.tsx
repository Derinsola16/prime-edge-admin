"use client"

import { toast } from "sonner"
import { Download, CreditCard } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { getWithdrawalRequestDetail, settleWithdrawal } from "@/services/api/finance"

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  )
}

export function WithdrawalRequestDrawer({
  requestId,
  onOpenChange,
}: {
  requestId?: string
  onOpenChange: (open: boolean) => void
}) {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ["withdrawal-request", requestId],
    queryFn: () => getWithdrawalRequestDetail(requestId!),
    enabled: !!requestId,
  })

  const mutation = useMutation({
    mutationFn: settleWithdrawal,
    onSuccess: () => {
      toast.success("Withdrawal marked as settled")
      queryClient.invalidateQueries({ queryKey: ["withdrawal-request", requestId] })
      queryClient.invalidateQueries({ queryKey: ["finance-transactions"] })
    },
  })

  const request = data?.data

  return (
    <Sheet open={!!requestId} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-skyblue-ghost text-brand-deepblue">
                <CreditCard className="size-4" />
              </span>
              <SheetTitle>Withdrawal Request</SheetTitle>
            </div>
            <button className="flex size-9 items-center justify-center rounded-full border border-border">
              <Download className="size-4" />
            </button>
          </div>
        </SheetHeader>

        {request && (
          <div className="space-y-5 rounded-xl bg-secondary p-5">
            <div>
              <p className="text-sm text-muted-foreground">Amount requested</p>
              <p className="text-3xl font-semibold text-brand-deepblue">
                ₦{request.amount_requested.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2 rounded-lg bg-card p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Funding Progress</span>
                <span className="text-brand-deepblue">
                  ₦{(request.funding_raised / 1_000_000).toFixed(0)}M of ₦
                  {(request.funding_target / 1_000_000).toFixed(0)}M
                </span>
              </div>
              <Progress value={request.funding_percent} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{request.funding_percent}%</span>
                <span>Payment Complete</span>
              </div>
            </div>

            <Row label="Investor name" value={request.investor_name} />
            <Row label="Amount in Wallet" value={`₦${request.amount_in_wallet.toLocaleString()}`} />
            <Row label="Prior Withdrawal Requests" value={request.prior_withdrawal_requests} />
            <Row label="Property" value={request.property} />
            <Row label="Payment Option" value={request.payment_option} />
            <Row label="Date" value={request.date} />

            <Button
              disabled={request.settled || mutation.isPending}
              onClick={() => mutation.mutate(request.id)}
              className="w-full rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
            >
              {request.settled ? "Withdrawal Settled" : "Withdrawal Settled"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Only click this button after payment has been made to the Investor
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
