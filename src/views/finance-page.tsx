"use client"

import Link from "next/link"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Eye, Search, Download, SlidersHorizontal, ChevronDown, ArrowUpRight, ArrowDownLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { getFinanceMetrics, getFinanceTransactions, getRevenueDistribution } from "@/services/api/finance"
import { FinanceMetrics } from "@/components/finance/finance-metrics"
import { RevenueChart } from "@/components/finance/revenue-chart"
import { PayoutQueue } from "@/components/finance/payout-queue"
import { WithdrawalRequestDrawer } from "@/components/finance/withdrawal-request-drawer"

const tabs = [
  { label: "All Transactions", value: "all" },
  { label: "Payments in", value: "payments_in" },
  { label: "Return on Investments", value: "roi" },
  { label: "Withdrawals", value: "withdrawals" },
  { label: "Requests", value: "requests" },
] as const

const statusClass: Record<string, string> = {
  pending: "border-orange-400 text-orange-500 bg-transparent",
  confirmed: "border-success text-success bg-transparent",
  completed: "border-transparent bg-success/10 text-success",
}

export default function FinancePage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["value"]>("all")
  const [selectedRequest, setSelectedRequest] = useState<string>()

  const { data: metricsRes } = useQuery({ queryKey: ["finance-metrics"], queryFn: getFinanceMetrics })
  const { data: revenueRes } = useQuery({ queryKey: ["revenue-distribution"], queryFn: getRevenueDistribution })
  const { data: txRes } = useQuery({
    queryKey: ["finance-transactions", tab],
    queryFn: () => getFinanceTransactions(tab),
  })

  const transactions = txRes?.data.items ?? []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Finance Management
        </h1>
        <Link
          href="/properties/add"
          className={buttonVariants({
            className: "rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover",
          })}
        >
          Create A Property
        </Link>
      </div>

      {metricsRes && <FinanceMetrics metrics={metricsRes.data} />}

      <div className="grid grid-cols-[1fr_380px] gap-6">
        {revenueRes && (
          <RevenueChart
            data={revenueRes.data.items}
            overallRevenueLabel={revenueRes.data.overall_revenue_label}
          />
        )}
        <PayoutQueue />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Transactions</h2>
          <Button variant="link" size="sm" className="text-brand-skyblue">
            See all
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1 rounded-full bg-muted p-1">
              {tabs.map(t => (
                <button
                  key={t.value}
                  onClick={() => setTab(t.value)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    tab === t.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <Button variant="outline" size="sm">
              <SlidersHorizontal className="size-4" />
              Customize Columns
              <ChevronDown className="size-4" />
            </Button>
          </div>

          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by name title or amount" className="h-10 pl-9" />
            </div>
            <Button variant="outline" size="sm">
              <Download className="size-4" />
              Download CSV
            </Button>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="w-8 py-3">
                  <input type="checkbox" className="accent-brand-deepblue" />
                </th>
                <th className="py-3 font-medium">{tab === "requests" ? "Investor" : "Title"}</th>
                <th className="py-3 font-medium">Amount</th>
                <th className="py-3 font-medium">Property</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Date</th>
                <th className="w-8 py-3" />
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-b border-border last:border-0">
                  <td className="py-4">
                    <input type="checkbox" className="accent-brand-deepblue" />
                  </td>
                  <td className="py-4 font-medium text-foreground">
                    <span className="flex items-center gap-1.5">
                      {tx.type === "roi" && <ArrowDownLeft className="size-3.5 text-success" />}
                      {tx.type === "payment_in" && <ArrowDownLeft className="size-3.5 text-brand-skyblue" />}
                      {tx.type === "withdrawal" && <ArrowUpRight className="size-3.5 text-destructive" />}
                      {tab === "requests" ? tx.investor_name : tx.title}
                    </span>
                  </td>
                  <td className="py-4 text-foreground">₦{tx.amount.toLocaleString()}</td>
                  <td className="py-4 text-muted-foreground">{tx.property}</td>
                  <td className="py-4">
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-xs font-medium",
                        statusClass[tx.status]
                      )}
                    >
                      {tx.status[0].toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 text-muted-foreground">{tx.date}</td>
                  <td className="py-4">
                    <button onClick={() => setSelectedRequest(tx.id)}>
                      <Eye className="size-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-6 text-sm text-muted-foreground">Showing 1-10 of 100 products</p>
        </div>
      </div>

      <WithdrawalRequestDrawer
        requestId={selectedRequest}
        onOpenChange={open => !open && setSelectedRequest(undefined)}
      />
    </div>
  )
}
