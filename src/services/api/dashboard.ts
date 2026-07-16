import { ApiSuccessResponse } from "@/types/api.types"
import { IDashboardMetrics, IPendingTask } from "@/types/dashboard.types"
import { IFinanceTransaction } from "@/types/finance.types"

// TODO: replace with real API calls once the backend endpoint is ready.
// import { http } from "@/utils/axios"

const MOCK_METRICS: IDashboardMetrics = {
  total_capital_deployed: 4_200_000_000,
  total_capital_growth: "+12.4%",
  total_investors: 804,
  new_investors_badge: "+12 New",
  investors_note: "This Month: 24",
  pending_tasks: 10,
  pending_tasks_note: "3 KYC, 3 Overdue Payments",
  active_projects: 12,
  active_projects_badge: "4 Live",
  active_projects_note: "14 in construction",
}

const MOCK_TASKS: IPendingTask[] = [
  {
    id: "pt1",
    title: "New KYC Submission",
    subtitle: "Aderinsola Odusanya",
    property: "4-Bedroom Penthouse",
    location: "IVIE TOWERS • Victoria Island",
    action_label: "Review",
    icon: "kyc",
  },
  {
    id: "pt2",
    title: "Title Deed Pending",
    subtitle: "Verification needed",
    property: "4-Bedroom Penthouse",
    location: "IVIE TOWERS • Victoria Island",
    action_label: "Verify now",
    icon: "title-deed",
  },
  {
    id: "pt3",
    title: "New KYC Submission",
    subtitle: "Lizzy Dahunsi",
    property: "4-Bedroom Penthouse",
    location: "IVIE TOWERS • Victoria Island",
    action_label: "Review",
    icon: "kyc",
  },
]

const MOCK_TRANSACTIONS: IFinanceTransaction[] = [
  { id: "dtx1", type: "roi", title: "Payment", amount: 50_000_000, property: "2-Bedroom Terrace + BQ", status: "pending", date: "01,15,2026; 10am" },
  { id: "dtx2", type: "payment_in", title: "Money Gained", amount: 50_000_000, property: "4-Bedroom Penthouse + BQ", status: "confirmed", date: "01,15,2026; 10am" },
  { id: "dtx3", type: "withdrawal", title: "Withdrawal", amount: 50_000_000, property: "N/A", status: "completed", date: "01,15,2026; 10am" },
  { id: "dtx4", type: "roi", title: "Payment", amount: 50_000_000, property: "2-Bedroom Terrace + BQ", status: "pending", date: "01,15,2026; 10am" },
]

export async function getDashboardMetrics(): Promise<ApiSuccessResponse<IDashboardMetrics>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: MOCK_METRICS }
}

export async function getPendingTasks(): Promise<ApiSuccessResponse<{ items: IPendingTask[] }>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_TASKS } }
}

export async function getDashboardTransactions(): Promise<
  ApiSuccessResponse<{ items: IFinanceTransaction[] }>
> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_TRANSACTIONS } }
}
