import { http } from "@/utils/axios"
import { ApiSuccessResponse, PaginatedResponse } from "@/types/api.types"
import {
  IAdminMetrics,
  IAdminUser,
  ICreateAdminRequest,
  IUpdateAdminRequest,
  AdminRole,
} from "@/types/admin.types"

export {
  ROLE_OPTIONS,
  PERMISSION_OPTIONS,
} from "@/types/admin.types"

type RawAdmin = {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: AdminRole
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
    role: raw.role,
    permissions: raw.permissions,
    avatar: raw.avatar,
    isActive: raw.isActive,
    createdAt: raw.createdAt,
  }
}

export async function getAdmins(params: {
  page?: number
  limit?: number
  role?: AdminRole
  isActive?: boolean
}): Promise<{ items: IAdminUser[]; total: number; page: number; pages: number; limit: number }> {
  const res = await http.get<PaginatedResponse<RawAdmin>>("/super-admin/admins", { params })

  return {
    items: res.data.data.map(mapAdmin),
    total: res.data.pagination.total,
    page: res.data.pagination.page,
    pages: res.data.pagination.pages,
    limit: res.data.pagination.limit,
  }
}

export async function getAdminById(id: string): Promise<ApiSuccessResponse<IAdminUser>> {
  const res = await http.get<ApiSuccessResponse<RawAdmin>>(`/super-admin/admins/${id}`)
  return { message: res.data.message, data: mapAdmin(res.data.data) }
}

export async function createAdmin(
  payload: ICreateAdminRequest
): Promise<ApiSuccessResponse<IAdminUser>> {
  const res = await http.post<ApiSuccessResponse<RawAdmin>>("/super-admin/admins", payload)
  return { message: res.data.message, data: mapAdmin(res.data.data) }
}

export async function updateAdmin(
  id: string,
  payload: IUpdateAdminRequest
): Promise<ApiSuccessResponse<IAdminUser>> {
  const res = await http.put<ApiSuccessResponse<RawAdmin>>(`/super-admin/admins/${id}`, payload)
  return { message: res.data.message, data: mapAdmin(res.data.data) }
}

export async function deleteAdmin(id: string): Promise<ApiSuccessResponse<{ id: string }>> {
  const res = await http.delete<ApiSuccessResponse<unknown>>(`/super-admin/admins/${id}`)
  return { message: res.data.message, data: { id } }
}

export async function toggleAdminStatus(id: string): Promise<ApiSuccessResponse<IAdminUser>> {
  const res = await http.patch<ApiSuccessResponse<RawAdmin>>(
    `/super-admin/admins/${id}/toggle-status`
  )
  return { message: res.data.message, data: mapAdmin(res.data.data) }
}

export async function resetAdminPassword(
  id: string,
  newPassword: string
): Promise<ApiSuccessResponse<unknown>> {
  const res = await http.post(`/super-admin/admins/${id}/reset-password`, { newPassword })
  return res.data
}

export async function getAdminMetrics(): Promise<IAdminMetrics> {
  const [total, admin, editor, viewer] = await Promise.all([
    getAdmins({ limit: 1 }),
    getAdmins({ limit: 1, role: "admin" }),
    getAdmins({ limit: 1, role: "editor" }),
    getAdmins({ limit: 1, role: "viewer" }),
  ])

  return {
    total: total.total,
    admin: admin.total,
    editor: editor.total,
    viewer: viewer.total,
  }
}
