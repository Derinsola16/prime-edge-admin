import cookie from "cookiejs";

export type Cookies = {
  [key: string]: string | null;
};

export function setCookieItem(key: string, value: unknown, expiration?: number) {
  // Sets the value with a 1-day expiry if custom value is not provided
  cookie.set(key, JSON.stringify(value), expiration ?? 1);
}

export function getCookieItem(key: string) {
  const value = cookie.get(key);

  if (typeof value === "string") {
    return JSON.parse(value);
  }

  return null; // Returns null if the cookie doesn't exist or is invalid
}

export function removeCookieItem(key: string) {
  cookie.remove(key);
}
