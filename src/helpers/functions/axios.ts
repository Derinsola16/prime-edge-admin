import { AxiosError } from "axios";

export function getAxiosErrorDetails(error: unknown) {
  const axiosError = error as AxiosError<{ message: string }>;
  const status = axiosError?.response?.status;
  const message = axiosError?.response?.data?.message;

  return [message, status ? `<Status code ${status}>` : null]
    .filter(Boolean)
    .join("\n");
}
