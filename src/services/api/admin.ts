import { ApiSuccessResponse } from "@/types/api.types"
import { IAdminMetrics, IAdminUser, IPermissionModule, IRoleOption } from "@/types/admin.types"

// TODO: replace with real API calls once the backend endpoint is ready.
// import { http } from "@/utils/axios"

const MOCK_METRICS: IAdminMetrics = {
  total_admin: 5,
  finance_admin: 2,
  client_managers: 2,
  super_admin: 1,
}

const MOCK_ADMINS: IAdminUser[] = [
  { id: "a1", name: "Hannah Abraham", role: "Super Admin", status: "active", last_seen: "2 minutes ago" },
  { id: "a2", name: "Mary Martha", role: "Finance Admin", status: "inactive", last_seen: "2 minutes ago" },
  { id: "a3", name: "Berks Gold", role: "Investor Admin", status: "active", last_seen: "2 minutes ago" },
  { id: "a4", name: "Grace Ajah", role: "Client Support", status: "active", last_seen: "2 minutes ago" },
  { id: "a5", name: "Berks Gold", role: "Investor Admin", status: "active", last_seen: "2 minutes ago" },
  { id: "a6", name: "Berks Gold", role: "Investor Admin", status: "active", last_seen: "2 minutes ago" },
]

export const ROLE_OPTIONS: IRoleOption[] = [
  { id: "super_admin", label: "Super Admin", description: "Full system access and user management capabilities.", icon: "shield" },
  { id: "finance_manager", label: "Finance Manager", description: "Access to payroll, billing reports, and budgets.", icon: "credit-card" },
  { id: "compliance_officer", label: "Compliance Officer", description: "Audit logs, regulatory reporting, and data privacy.", icon: "shield-check" },
  { id: "viewer", label: "Viewer", description: "Read-only access across modules. Cannot edit.", icon: "eye" },
]

export const PERMISSION_MODULES: IPermissionModule[] = [
  {
    id: "clients",
    label: "Clients Manager",
    icon: "users",
    permissions: ["View Clients", "Approve KYC", "Edit Profile", "Export Data"],
  },
  {
    id: "properties",
    label: "Property Management",
    icon: "briefcase",
    permissions: ["View Inventory", "Add New Property", "Update Construction Progress", "Manage Financials"],
  },
  {
    id: "financials",
    label: "Financials",
    icon: "landmark",
    permissions: ["View Ledger", "Reconcile Payments", "Process Payouts"],
  },
  {
    id: "system",
    label: "System",
    icon: "settings",
    permissions: ["View Audit Logs", "Manage Team", "Edit System Settings"],
  },
]

export async function getAdminMetrics(): Promise<ApiSuccessResponse<IAdminMetrics>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: MOCK_METRICS }
}

export async function getAdmins(): Promise<ApiSuccessResponse<{ items: IAdminUser[] }>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_ADMINS } }
}

export async function inviteTeamMember(
  payload: Record<string, unknown>
): Promise<ApiSuccessResponse<{ id: string }>> {
  await new Promise(resolve => setTimeout(resolve, 500))
  void payload
  return { message: "ok", data: { id: `a${Date.now()}` } }
}

export async function createCustomRole(
  payload: Record<string, unknown>
): Promise<ApiSuccessResponse<{ id: string }>> {
  await new Promise(resolve => setTimeout(resolve, 500))
  void payload
  return { message: "ok", data: { id: `role${Date.now()}` } }
}

export async function deleteAdmin(id: string): Promise<ApiSuccessResponse<{ id: string }>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  const index = MOCK_ADMINS.findIndex(a => a.id === id)
  if (index >= 0) MOCK_ADMINS.splice(index, 1)
  return { message: "ok", data: { id } }
}
