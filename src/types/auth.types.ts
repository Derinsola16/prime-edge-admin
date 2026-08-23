import { ApiSuccessResponse } from "@/types/api.types";

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = ApiSuccessResponse<ITokens>;

export type ITokens = {
  accessToken: string;
  refreshToken: string;
};
