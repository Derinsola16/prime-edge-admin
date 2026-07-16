import { z } from "zod";

// Client-side environment variables (available in browser)
const clientConfigSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().min(1, "NEXT_PUBLIC_BASE_URL is required"),
});

// Parse client config
const clientConfig = clientConfigSchema.parse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Client exports
export const baseUrl = clientConfig.NEXT_PUBLIC_BASE_URL;
