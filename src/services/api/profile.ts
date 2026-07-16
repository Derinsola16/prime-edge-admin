import { ApiSuccessResponse } from "@/types/api.types"

// TODO: replace with a real API call once the backend endpoint is ready.
// import { http } from "@/utils/axios"

export async function updateUserProfile(
  payload: Record<string, unknown>
): Promise<ApiSuccessResponse<{ id: string }>> {
  await new Promise(resolve => setTimeout(resolve, 400))
  void payload
  return { message: "ok", data: { id: "usr_1" } }
}
