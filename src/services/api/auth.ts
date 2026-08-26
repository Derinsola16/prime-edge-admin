import { LoginRequest, LoginResponse } from "@/types/auth.types";
import { httpNoAuth } from "@/utils/axios";
import { StorageKeys } from "@/types/storage.types";
import { setCookieItem } from "@/helpers/functions/cookie";

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const res = await httpNoAuth.post<LoginResponse>("/admin/login", payload);

  setCookieItem(StorageKeys.AUTHENTICATED_USER_TOKENS, res.data.data);

  return res.data;
};
