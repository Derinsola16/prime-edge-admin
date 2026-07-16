"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IPropertyDetail } from "@/types/property.types"

export function InvestmentSummary({ property }: { property: IPropertyDetail }) {
  const [plan, setPlan] = useState<"one-time" | "installments">("one-time")
  const [amount, setAmount] = useState(String(property.min_investment_amount))

  const plans = [
    {
      id: "one-time" as const,
      label: "One Time Payment",
      note: "Pay once and own for life",
    },
    {
      id: "installments" as const,
      label: "5 months Payment Plan",
      note: `Pay ₦${(property.min_investment_amount / 5).toLocaleString()} monthly at 0% interest rate`,
    },
  ]

  return (
    <div className="sticky top-8 rounded-xl border border-border bg-card p-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Investment Summary
          </h3>
          <p className="text-sm text-muted-foreground">
            Allocation closes in {property.days_left} days
          </p>
        </div>
        <Button variant="ghost" size="icon" aria-label="Refresh">
          <RefreshCw className="size-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="mb-6 space-y-3 rounded-lg bg-secondary p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Current Valuation</span>
          <span className="font-medium text-foreground">
            ₦{property.current_valuation.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Share Price</span>
          <span className="font-medium text-foreground">
            ₦{property.share_price.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Hold Period</span>
          <span className="font-medium text-foreground">
            {property.hold_period}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-foreground">
          Investment Amount
        </label>
        <Input
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="h-11"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Minimum investment: ₦{property.min_investment_amount.toLocaleString()}
        </p>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-foreground">
          Select Payment Plan
        </p>
        <div className="space-y-2">
          {plans.map(p => (
            <label
              key={p.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4",
                plan === p.id && "border-brand-skyblue bg-brand-skyblue-ghost"
              )}
            >
              <input
                type="radio"
                name="payment-plan"
                checked={plan === p.id}
                onChange={() => setPlan(p.id)}
                className="mt-1 accent-brand-deepblue"
              />
              <span>
                <span className="block text-sm font-medium text-foreground">
                  {p.label}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {p.note}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button className="mb-4 w-full rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover">
        Invest Now
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By investing you agree to our{" "}
        <a href="#" className="text-brand-skyblue hover:underline">
          Terms of Service
        </a>
        .
      </p>
    </div>
  )
}
