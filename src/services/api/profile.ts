import { ApiSuccessResponse } from "@/types/api.types"
import { http } from "@/utils/axios"

export type UpdateProfilePayload = {
  firstName?: string
  lastName?: string
  phone?: string
}

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<ApiSuccessResponse<unknown>> {
  const res = await http.put("/admin/profile", payload)
  return res.data
}

export async function uploadAvatar(file: File): Promise<ApiSuccessResponse<unknown>> {
  const formData = new FormData()
  formData.append("avatar", file)

  const res = await http.put("/admin/profile/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return res.data
}

export type ChangePasswordPayload = {
  currentPassword: string
  newPassword: string
}

export async function changePassword(
  payload: ChangePasswordPayload
): Promise<ApiSuccessResponse<unknown>> {
  const res = await http.put("/admin/change-password", payload)
  return res.data
}
