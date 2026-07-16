import { IUser } from "@/types/user.types";
import { ApiSuccessResponse } from "@/types/api.types";

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = ApiSuccessResponse<{
  user: IUser;
  tokens: ITokens;
}>;

export type RefreshTokenResponse = ApiSuccessResponse<{
  tokens: ITokens;
}>;

export type ITokens = {
  issued_at: number;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

export interface SendResetEmailRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}
