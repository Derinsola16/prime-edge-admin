import { AdminPermission, AdminRole } from "@/types/admin.types";

export type IUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar_url?: string;
  status: "active" | "inactive";
  role: AdminRole;
  permissions: AdminPermission[];
  created_at: string;
};

export type IUserState = {
  value: IUser | null;
};
