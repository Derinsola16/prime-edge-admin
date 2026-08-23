import { http } from "@/utils/axios"
import { ApiSuccessResponse, PaginatedResponse } from "@/types/api.types"
import {
  IClient,
  IClientActivity,
  IClientDetail,
  IClientMetrics,
  IUserListItem,
  ITransactionDetail,
  KycStatus,
} from "@/types/client.types"

// getClientById/getClientActivity/getTransactionDetail/updateKycStatus below are still
// mocked — they need /kyc, /investment, /payment endpoints, out of scope for now.

const MOCK_METRICS: IClientMetrics = {
  total_clients: 1567,
  total_clients_growth: "+12.4% from last month",
  pending_kyc: 209,
  kyc_approved: 1089,
  total_properties_funded: 10,
  total_signups: 2560,
}

const NAMES = [
  "Lizzy Dahunsi",
  "Lizzy Dahunsi",
  "Aderinsola Odunsanya",
  "Aderinsola Odunsanya",
  "Aderinsola Odunsanya",
  "David Tobe",
]

const MOCK_CLIENTS: IClient[] = NAMES.map((name, i) => ({
  id: `cl${i + 1}`,
  name,
  portfolio_value: 50_000_000,
  country: "Nigeria",
  kyc_status: (["pending", "pending", "approved", "approved", "approved", "rejected"] as KycStatus[])[i],
  join_date: "01,15,2026; 10am",
}))

const MOCK_ACTIVITY: IClientActivity[] = [
  {
    id: "a1",
    title: "Initial Deposit",
    subtitle: "The Ivie funding top up",
    amount: 50_000_000,
    status: "completed",
    execution_date: "01,15,2026; 10am",
  },
  {
    id: "a2",
    title: "KYC Submission",
    subtitle: "2-bedroom Apartment • The Haven",
    amount: 50_000_000,
    status: "pending",
    execution_date: "01,15,2026; 10am",
  },
  {
    id: "a3",
    title: "Payment Top Up",
    subtitle: "2-bedroom Apartment ROI • The Haven",
    amount: 50_000_000,
    status: "pending",
    execution_date: "01,15,2026; 10am",
  },
]

const MOCK_TRANSACTION: ITransactionDetail = {
  id: "t1",
  amount: 5_000_000,
  payment_plan: "5-Month Payment Plan",
  funding_raised: 25_000_000,
  funding_target: 25_000_000,
  funding_percent: 100,
  account_name: "Hannah Abraham",
  paid_to: "Prime Edge Ventures",
  payment_type: "Property Purchase",
  property: "2-Bedroom Terrace + BQ",
  reference_number: "R123344XCVDF-89654-KJHGBM",
  payment_option: "Bank Transfer",
  payment_status: "Confirmed",
  date: "Jan 14th, 2026, 10:51 AM",
}

export async function getClientMetrics(): Promise<ApiSuccessResponse<IClientMetrics>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: MOCK_METRICS }
}

type RawUser = {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  avatar?: string
  address?: IUserListItem["address"]
  emailVerification?: { isVerified: boolean }
  isActive: boolean
  lastLogin?: string
  createdAt: string
}

function mapUser(raw: RawUser): IUserListItem {
  return {
    id: raw._id,
    firstName: raw.firstName,
    lastName: raw.lastName,
    email: raw.email,
    phone: raw.phone,
    avatar: raw.avatar,
    address: raw.address,
    isVerified: raw.emailVerification?.isVerified ?? false,
    isActive: raw.isActive,
    lastLogin: raw.lastLogin,
    createdAt: raw.createdAt,
  }
}

export async function getUsers(params: {
  page?: number
  limit?: number
  isVerified?: boolean
}): Promise<{ items: IUserListItem[]; total: number; page: number; pages: number; limit: number }> {
  const res = await http.get<PaginatedResponse<RawUser>>("/admin/users", { params })

  return {
    items: res.data.data.map(mapUser),
    total: res.data.pagination.total,
    page: res.data.pagination.page,
    pages: res.data.pagination.pages,
    limit: res.data.pagination.limit,
  }
}

export async function getUserById(id: string): Promise<ApiSuccessResponse<IUserListItem>> {
  const res = await http.get<ApiSuccessResponse<RawUser>>(`/admin/users/${id}`)
  return { message: res.data.message, data: mapUser(res.data.data) }
}

export async function deleteUser(id: string): Promise<ApiSuccessResponse<{ id: string }>> {
  const res = await http.delete<ApiSuccessResponse<unknown>>(`/admin/users/${id}`)
  return { message: res.data.message, data: { id } }
}

export async function toggleUserStatus(id: string): Promise<ApiSuccessResponse<IUserListItem>> {
  const res = await http.patch<ApiSuccessResponse<RawUser>>(`/admin/users/${id}/toggle-status`)
  return { message: res.data.message, data: mapUser(res.data.data) }
}

export async function getClientById(id: string): Promise<ApiSuccessResponse<IClientDetail>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  const client = MOCK_CLIENTS.find(c => c.id === id) ?? MOCK_CLIENTS[0]

  return {
    message: "ok",
    data: {
      id: client.id,
      name: client.name,
      reference: "#PRMEDE-00293",
      status: "new",
      kyc_status: client.kyc_status,
      email: "lizzydahunsi@example.com",
      phone: "+234-11223344",
      location: "Lagos, Nigeria",
      date_joined: "Jan 14th, 2026, 10:51 AM",
      metrics: {
        total_property: 2,
        delivered_homes: 0,
        property_in_funding: 2,
        kyc_submitted: 2,
        pending_documents: 10,
      },
      funding_raised: 20_000_000,
      funding_target: 150_000_000,
      funding_percent: 25,
      number_of_projects: 2,
      months_left: 5,
    },
  }
}

export async function getClientActivity(
  clientId: string
): Promise<ApiSuccessResponse<{ items: IClientActivity[] }>> {
  void clientId
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_ACTIVITY } }
}

export async function getTransactionDetail(
  activityId: string
): Promise<ApiSuccessResponse<ITransactionDetail>> {
  void activityId
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: MOCK_TRANSACTION }
}

export async function updateKycStatus(payload: {
  clientId: string
  status: KycStatus
}): Promise<ApiSuccessResponse<{ id: string }>> {
  await new Promise(resolve => setTimeout(resolve, 500))
  const client = MOCK_CLIENTS.find(c => c.id === payload.clientId)
  if (client) client.kyc_status = payload.status
  return { message: "ok", data: { id: payload.clientId } }
}
