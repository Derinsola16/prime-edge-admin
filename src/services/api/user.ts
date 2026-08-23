import { IUser } from "@/types/user.types";
import { ApiSuccessResponse } from "@/types/api.types";
import { http } from "@/utils/axios";

type AdminProfileResponse = {
  message: string;
  data: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: IUser["role"];
    permissions: IUser["permissions"];
    avatar?: string;
    isActive: boolean;
    createdAt: string;
  };
};

export async function getSessionUser(): Promise<ApiSuccessResponse<IUser>> {
  const res = await http.get<AdminProfileResponse>("/admin/profile");
  const admin = res.data.data;

  const user: IUser = {
    id: admin._id,
    email: admin.email,
    first_name: admin.firstName,
    last_name: admin.lastName,
    phone: admin.phone,
    avatar_url: admin.avatar,
    status: admin.isActive ? "active" : "inactive",
    role: admin.role,
    permissions: admin.permissions,
    created_at: admin.createdAt,
  };

  return { message: res.data.message, data: user };
}
