import axios, { AxiosInstance } from "axios";
import { ITokens } from "@/types/auth.types";
import { baseUrl } from "@/utils/env.client";
import { StorageKeys } from "@/types/storage.types";
import { refreshAccessToken } from "@/services/api/auth";
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
    const jwt = tokens?.access_token;
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

// Shared refresh promise — ensures only one token refresh runs at a time.
// Concurrent 401s wait for the same promise instead of each triggering
// a separate refresh, which would consume the refresh token multiple times.
let refreshPromise: Promise<string> | null = null;

// Adding an interceptor to the HTTP client to handle responses.
http.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    // Store the original request that caused the error.
    const originalRequest = error.config;

    // Check if the error status is 401 (Unauthorized) and the request has not been retried yet.
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Mark the request as retried.
      originalRequest._retry = true;

      try {
        // If a refresh is already in flight, wait for it instead of firing a new one —
        // prevents concurrent refresh calls that would consume the refresh token multiple times.
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            // Clear the promise once settled so future expiries can refresh again.
            refreshPromise = null;
          });
        }

        const newAccessToken = await refreshPromise;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return await http(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("session:hard-expired"));
        }

        return Promise.reject(refreshError);
      }
    }

    // If the request was already retried and still got a 401, session is dead — notify the UI.
    if (error.response?.status === 401 && originalRequest._retry) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("session:hard-expired"));
      }
    }

    return Promise.reject(error);
  }
);

export { httpNoAuth, http };
