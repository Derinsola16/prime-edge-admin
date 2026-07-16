import {
  ITokens,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  ResetPasswordRequest,
  SendResetEmailRequest,
} from "@/types/auth.types";
import { httpNoAuth } from "@/utils/axios";
import { StorageKeys } from "@/types/storage.types";
import { getCookieItem, setCookieItem } from "@/helpers/functions/cookie";

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const url = "/api/users/login";
  const res = await httpNoAuth.post<LoginResponse>(url, payload);

  setCookieItem(StorageKeys.AUTHENTICATED_USER_TOKENS, res.data.data.tokens);

  return res.data;
};

export const refreshAccessToken = async () => {
  const tokens: ITokens = getCookieItem(StorageKeys.AUTHENTICATED_USER_TOKENS);

  // Request a new access token using the stored refresh token
  const res = await httpNoAuth.post<RefreshTokenResponse>(
    "/api/users/token/refresh",
    { refresh_token: tokens.refresh_token }
  );

  const freshTokens: ITokens = {
    ...res.data.data.tokens,
  };

  // Save the fresh tokens in cookies
  setCookieItem(StorageKeys.AUTHENTICATED_USER_TOKENS, freshTokens);

  // Return the fresh access token
  return freshTokens.access_token;
};

export const sendPasswordResetEmail = async <T = unknown>(
  payload: SendResetEmailRequest
): Promise<T> => {
  const url = "/api/users/forgot-password";
  const res = await httpNoAuth.post(url, payload);

  return res.data;
};

export const resetPassword = async <T = unknown>(
  payload: ResetPasswordRequest
): Promise<T> => {
  const url = "/api/users/reset-password";
  const res = await httpNoAuth.post(url, payload);

  return res.data;
};
