import axios, { AxiosInstance } from "axios";
import { ITokens } from "@/types/auth.types";
import { baseUrl } from "@/utils/env.client";
import { StorageKeys } from "@/types/storage.types";
import { getCookieItem } from "@/helpers/functions/cookie";

const http: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const httpNoAuth: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
});

// Adding an interceptor to the HTTP client to handle requests.
http.interceptors.request.use(async config => {
  if (typeof document !== "undefined") {
    // Client request: retrieve the tokens from the cookies.
    const tokens: ITokens = getCookieItem(
      StorageKeys.AUTHENTICATED_USER_TOKENS
    );
    // Extract the JWT token from the user data.
    const jwt = tokens?.accessToken;
    // Construct the authorization token if JWT is present.
    const AUTH_TOKEN = jwt ? `Bearer ${jwt}` : null;

    // If AUTH_TOKEN exists, add it to the request headers.
    if (AUTH_TOKEN) {
      config.headers["Authorization"] = AUTH_TOKEN;
    }
  } else {
    // Server request
    console.log(
      "Request running on server. Authorisation credentials are missing"
    );
  }

  // Return the request to proceed.
  return config;
});

// Adding an interceptor to the HTTP client to handle responses.
// The backend has no token-refresh endpoint, so a 401 always means the
// session is dead — notify the UI to redirect to login.
http.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("session:hard-expired"));
    }

    return Promise.reject(error);
  }
);

export { httpNoAuth, http };
