import { http } from "@/utils/axios"
import { ApiSuccessResponse, PaginatedResponse } from "@/types/api.types"
import {
  IAdminMetrics,
  IAdminUser,
  ICreateAdminRequest,
  IUpdateAdminRequest,
  AdminRole,
  PermissionCatalogGroup,
} from "@/types/admin.types"

export { ROLE_OPTIONS } from "@/types/admin.types"

type RawAdmin = {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  roleType: AdminRole
  permissions: IAdminUser["permissions"]
  avatar?: string
  isActive: boolean
  createdAt: string
}

function mapAdmin(raw: RawAdmin): IAdminUser {
  return {
    id: raw._id,
    firstName: raw.firstName,
    lastName: raw.lastName,
    email: raw.email,
    phone: raw.phone,
    role: raw.roleType,
    permissions: raw.permissions,
    avatar: raw.avatar,
    isActive: raw.isActive,
    createdAt: raw.createdAt,
  }
}

export async function getAdmins(params: {
  page?: number
  limit?: number
  roleType?: AdminRole
  isActive?: boolean
}): Promise<{ items: IAdminUser[]; total: number; page: number; pages: number; limit: number }> {
  const res = await http.get<PaginatedResponse<RawAdmin>>("/admin/admins", { params })

  return {
    items: res.data.data.map(mapAdmin),
    total: res.data.pagination.total,
    page: res.data.pagination.page,
    pages: res.data.pagination.pages,
    limit: res.data.pagination.limit,
  }
}

export async function getAdminById(id: string): Promise<ApiSuccessResponse<IAdminUser>> {
  const res = await http.get<ApiSuccessResponse<RawAdmin>>(`/admin/admins/${id}`)
  return { message: res.data.message, data: mapAdmin(res.data.data) }
}

export async function createAdmin(
  payload: ICreateAdminRequest
): Promise<ApiSuccessResponse<IAdminUser>> {
  const res = await http.post<ApiSuccessResponse<RawAdmin>>("/admin/admins", payload)
  return { message: res.data.message, data: mapAdmin(res.data.data) }
}

export async function updateAdmin(
  id: string,
  payload: IUpdateAdminRequest
): Promise<ApiSuccessResponse<IAdminUser>> {
  const res = await http.put<ApiSuccessResponse<RawAdmin>>(`/admin/admins/${id}`, payload)
  return { message: res.data.message, data: mapAdmin(res.data.data) }
}

export async function deleteAdmin(id: string): Promise<ApiSuccessResponse<{ id: string }>> {
  const res = await http.delete<ApiSuccessResponse<unknown>>(`/admin/admins/${id}`)
  return { message: res.data.message, data: { id } }
}

export async function toggleAdminStatus(id: string): Promise<ApiSuccessResponse<IAdminUser>> {
  const res = await http.patch<ApiSuccessResponse<RawAdmin>>(`/admin/admins/${id}/toggle-status`)
  return { message: res.data.message, data: mapAdmin(res.data.data) }
}

export async function resetAdminPassword(
  id: string,
  newPassword: string
): Promise<ApiSuccessResponse<unknown>> {
  const res = await http.post(`/admin/admins/${id}/reset-password`, { newPassword })
  return res.data
}

export async function getAdminMetrics(): Promise<IAdminMetrics> {
  const [total, admin, support, custom] = await Promise.all([
    getAdmins({ limit: 1 }),
    getAdmins({ limit: 1, roleType: "admin" }),
    getAdmins({ limit: 1, roleType: "support" }),
    getAdmins({ limit: 1, roleType: "custom" }),
  ])

  return {
    total: total.total,
    admin: admin.total,
    support: support.total,
    custom: custom.total,
  }
}

// ── Permission catalog ──────────────────────────────────────────────────────

type RawPermissionCatalog = Record<string, Record<string, string>>

const MODULE_LABELS: Record<string, string> = {
  clients: "Clients",
  property: "Property",
  financials: "Financials",
  content: "Content",
  system: "System",
  support: "Support",
  users: "Users",
}

function titleCase(key: string): string {
  return key
    .split("_")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export async function getPermissionCatalog(): Promise<PermissionCatalogGroup[]> {
  const res = await http.get<ApiSuccessResponse<RawPermissionCatalog>>("/admin/permissions")

  return Object.entries(res.data.data).map(([module, entries]) => ({
    module,
    label: MODULE_LABELS[module] ?? titleCase(module),
    permissions: Object.entries(entries).map(([key, value]) => ({
      value,
      label: titleCase(key),
    })),
  }))
}
