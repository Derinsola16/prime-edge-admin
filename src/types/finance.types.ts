export type IFinanceMetrics = {
  gross_capital_inflow: number
  pending_installments: number
  pending_installments_count: number
  total_payouts: number
  payout_ratio_note: string
  platform_revenue: number
  platform_revenue_note: string
}

export type IRevenuePoint = { month: string; inflow: number; outflow: number }

export type IPayoutQueueItem = {
  id: string
  investor_name: string
  note: string
  amount: number
}

export type FinanceTransactionStatus = "pending" | "confirmed" | "completed"

export type IFinanceTransaction = {
  id: string
  type: "roi" | "payment_in" | "withdrawal" | "request"
  title: string
  amount: number
  property: string
  status: FinanceTransactionStatus
  date: string
  investor_name?: string
}

export type IWithdrawalRequestDetail = {
  id: string
  amount_requested: number
  funding_raised: number
  funding_target: number
  funding_percent: number
  investor_name: string
  amount_in_wallet: number
  prior_withdrawal_requests: number
  property: string
  payment_option: string
  date: string
  settled: boolean
}
