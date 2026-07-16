import { ApiSuccessResponse } from "@/types/api.types"
import {
  IFinanceMetrics,
  IFinanceTransaction,
  IPayoutQueueItem,
  IRevenuePoint,
  IWithdrawalRequestDetail,
} from "@/types/finance.types"

// TODO: replace with real API calls once the backend endpoint is ready.
// import { http } from "@/utils/axios"

const MOCK_METRICS: IFinanceMetrics = {
  gross_capital_inflow: 4_200_000_000,
  pending_installments: 1_200_000_000,
  pending_installments_count: 12,
  total_payouts: 5_600_000_000,
  payout_ratio_note: "+8.4% payout ratio increase",
  platform_revenue: 806_890_000,
  platform_revenue_note: "100M: 85% Target reached",
}

const MOCK_REVENUE: IRevenuePoint[] = [
  { month: "Sep", inflow: 18000, outflow: 21000 },
  { month: "Oct", inflow: 22000, outflow: 19000 },
  { month: "Nov", inflow: 19500, outflow: 24000 },
  { month: "Dec", inflow: 24000, outflow: 22500 },
  { month: "Jan", inflow: 27000, outflow: 20000 },
  { month: "Feb", inflow: 25500, outflow: 26000 },
  { month: "Mar", inflow: 29000, outflow: 27500 },
  { month: "Apr", inflow: 31000, outflow: 29000 },
  { month: "May", inflow: 28500, outflow: 30500 },
  { month: "Jun", inflow: 33000, outflow: 32000 },
  { month: "Jul", inflow: 35800, outflow: 33500 },
  { month: "Aug", inflow: 34000, outflow: 35000 },
]

const MOCK_PAYOUT_QUEUE: IPayoutQueueItem[] = [
  { id: "pq1", investor_name: "Aderinsola Odusanya", note: "Q1 returns • The Haven", amount: 100_000 },
  { id: "pq2", investor_name: "Lizzy Dahunsi", note: "Q1 returns • The Haven", amount: 100_000 },
  { id: "pq3", investor_name: "Lizzy Dahunsi", note: "Q1 returns • The Haven", amount: 100_000 },
]

const MOCK_TRANSACTIONS: IFinanceTransaction[] = [
  { id: "tx1", type: "roi", title: "ROI", amount: 50_000_000, property: "2-Bedroom Terrace + BQ", status: "pending", date: "01,15,2026; 10am" },
  { id: "tx2", type: "payment_in", title: "Payment In", amount: 50_000_000, property: "4-Bedroom Penthouse + BQ", status: "confirmed", date: "01,15,2026; 10am" },
  { id: "tx3", type: "withdrawal", title: "Withdrawal", amount: 50_000_000, property: "N/A", status: "completed", date: "01,15,2026; 10am" },
  { id: "tx4", type: "roi", title: "ROI", amount: 50_000_000, property: "2-Bedroom Terrace + BQ", status: "pending", date: "01,15,2026; 10am" },
]

const MOCK_REQUESTS: IFinanceTransaction[] = Array.from({ length: 4 }).map((_, i) => ({
  id: `req${i + 1}`,
  type: "request",
  title: "Withdrawal Request",
  investor_name: "Aderinsola Hannah",
  amount: 50_000_000,
  property: "2-Bedroom Terrace + BQ",
  status: "pending",
  date: "01,15,2026; 10am",
}))

const MOCK_WITHDRAWAL_DETAIL: IWithdrawalRequestDetail = {
  id: "wr1",
  amount_requested: 50_000,
  funding_raised: 25_000_000,
  funding_target: 25_000_000,
  funding_percent: 100,
  investor_name: "Aderinsola Hannah",
  amount_in_wallet: 500_000,
  prior_withdrawal_requests: 0,
  property: "2-Bedroom Terrace + BQ",
  payment_option: "Bank Transfer",
  date: "Jan 14th, 2026, 10:51 AM",
  settled: false,
}

export async function getFinanceMetrics(): Promise<ApiSuccessResponse<IFinanceMetrics>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: MOCK_METRICS }
}

export async function getRevenueDistribution(): Promise<
  ApiSuccessResponse<{ items: IRevenuePoint[]; overall_revenue_label: string }>
> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_REVENUE, overall_revenue_label: "$35,8K" } }
}

export async function getPayoutQueue(): Promise<
  ApiSuccessResponse<{ items: IPayoutQueueItem[]; total: number }>
> {
  await new Promise(resolve => setTimeout(resolve, 300))
  const total = MOCK_PAYOUT_QUEUE.reduce((sum, i) => sum + i.amount, 0)
  return { message: "ok", data: { items: MOCK_PAYOUT_QUEUE, total } }
}

export async function processBatchPayout(): Promise<ApiSuccessResponse<{ processed: number }>> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return { message: "ok", data: { processed: MOCK_PAYOUT_QUEUE.length } }
}

export async function getFinanceTransactions(
  tab: "all" | "payments_in" | "roi" | "withdrawals" | "requests"
): Promise<ApiSuccessResponse<{ items: IFinanceTransaction[] }>> {
  await new Promise(resolve => setTimeout(resolve, 300))

  if (tab === "requests") return { message: "ok", data: { items: MOCK_REQUESTS } }

  const items = MOCK_TRANSACTIONS.filter(t => {
    if (tab === "all") return true
    if (tab === "payments_in") return t.type === "payment_in"
    if (tab === "roi") return t.type === "roi"
    if (tab === "withdrawals") return t.type === "withdrawal"
    return true
  })

  return { message: "ok", data: { items } }
}

export async function getWithdrawalRequestDetail(
  id: string
): Promise<ApiSuccessResponse<IWithdrawalRequestDetail>> {
  void id
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: MOCK_WITHDRAWAL_DETAIL }
}

export async function settleWithdrawal(
  id: string
): Promise<ApiSuccessResponse<{ id: string }>> {
  await new Promise(resolve => setTimeout(resolve, 400))
  MOCK_WITHDRAWAL_DETAIL.settled = true
  return { message: "ok", data: { id } }
}
