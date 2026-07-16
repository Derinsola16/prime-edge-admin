import { IUser } from "@/types/user.types";
import { ApiSuccessResponse } from "@/types/api.types";

// TODO: replace with a real API call once the backend endpoint is ready.
// import { http } from "@/utils/axios";

const MOCK_USER: IUser = {
  id: "usr_1",
  email: "hannah@president.com",
  first_name: "Hannah",
  last_name: "4President",
  status: "active",
  created_at: "2025-01-01T00:00:00.000Z",
  updated_at: "2025-01-01T00:00:00.000Z",
};

export async function getSessionUser(): Promise<ApiSuccessResponse<IUser>> {
  // const res = await http.get("/api/users/me");
  // return res.data;

  await new Promise(resolve => setTimeout(resolve, 300));

  return { message: "ok", data: MOCK_USER };
}
