"use client"

import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { getPayoutQueue, processBatchPayout } from "@/services/api/finance"

export function PayoutQueue() {
  const queryClient = useQueryClient()
  const { data } = useQuery({ queryKey: ["payout-queue"], queryFn: getPayoutQueue })

  const mutation = useMutation({
    mutationFn: processBatchPayout,
    onSuccess: () => {
      toast.success("Batch payout processed")
      queryClient.invalidateQueries({ queryKey: ["payout-queue"] })
    },
  })

  const items = data?.data.items ?? []
  const total = data?.data.total ?? 0

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground">Payout Queue</h3>
      <p className="mb-4 text-sm text-muted-foreground">Upcoming investor disbursements</p>

      <div className="space-y-1">
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-border py-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                {item.investor_name.split(" ").map(n => n[0]).join("")}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{item.investor_name}</p>
                <p className="text-xs text-muted-foreground">{item.note}</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-foreground">
              ₦{(item.amount / 1000).toFixed(0)}k
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">Total Queue</span>
        <span className="font-semibold text-foreground">₦{(total / 1000).toFixed(0)}k</span>
      </div>

      <Button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
        className="mt-4 w-full rounded-full bg-brand-skyblue text-white hover:bg-brand-skyblue-hover"
      >
        {mutation.isPending ? "Processing…" : "Process Batch"}
      </Button>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        This will initiate transfers to verified investors
      </p>
    </div>
  )
}
