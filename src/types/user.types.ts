export type IUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
};

export type IUserState = {
  value: IUser | null;
};
