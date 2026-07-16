import { ApiSuccessResponse } from "@/types/api.types"
import { ISettings } from "@/types/settings.types"

// TODO: replace with real API calls once the backend endpoint is ready.
// import { http } from "@/utils/axios"

const MOCK_SETTINGS: ISettings = {
  notifications: [
    {
      id: "new_investment_alert",
      title: "New Investment Alert",
      description: "Notify Finance & Super Admin teams when a new wire transfer is initiated.",
      icon: "wallet",
      enabled: true,
    },
    {
      id: "kyc_submission",
      title: "KYC Submission",
      description: "Trigger alert when a high-net-worth individual submits verification documents.",
      icon: "file-text",
      enabled: true,
    },
    {
      id: "withdrawal_priority",
      title: "Withdrawal Request on Priority",
      description: "Immediate priority alert for all withdrawal requests exceeding $50,000.",
      icon: "alert",
      enabled: true,
    },
    {
      id: "withdrawal_request",
      title: "Withdrawal Request",
      description: "Alert for all withdrawal requests no matter the amount",
      icon: "bell",
      enabled: true,
    },
    {
      id: "chat_support_message",
      title: "Chat Support Message",
      description: "Trigger alert When a chat for support is sent to the admin",
      icon: "message",
      enabled: true,
    },
  ],
  security: [
    {
      id: "session_timeout",
      icon: "timer",
      category: "Timer",
      title: "Admin Session Timeout",
      description: "Automatically terminate inactive administrative sessions.",
      enabled: true,
      value: "30 Minutes",
      options: ["15 Minutes", "30 Minutes", "1 Hour"],
    },
    {
      id: "ip_whitelisting",
      icon: "network",
      category: "Ian",
      title: "Corporate IP Whitelisting",
      description: "Restrict access to known office IP ranges for financial modules.",
      enabled: true,
      value: "Strict (HQ Only)",
      options: ["Strict (HQ Only)", "Relaxed (Any Location)"],
    },
    {
      id: "password_complexity",
      icon: "lock",
      category: "Password",
      title: "Complexity Enforcement",
      description: "Global requirement for admin password entropy levels.",
      enabled: true,
      value: "High (12+ Chars, Symbols)",
      options: ["Standard (8+ Chars)", "High (12+ Chars, Symbols)"],
    },
  ],
}

export async function getSettings(): Promise<ApiSuccessResponse<ISettings>> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: MOCK_SETTINGS }
}

export async function updateNotificationSetting(payload: {
  id: string
  enabled: boolean
}): Promise<ApiSuccessResponse<{ id: string }>> {
  await new Promise(resolve => setTimeout(resolve, 200))
  const setting = MOCK_SETTINGS.notifications.find(n => n.id === payload.id)
  if (setting) setting.enabled = payload.enabled
  return { message: "ok", data: { id: payload.id } }
}

export async function updateSecuritySetting(payload: {
  id: string
  enabled?: boolean
  value?: string
}): Promise<ApiSuccessResponse<{ id: string }>> {
  await new Promise(resolve => setTimeout(resolve, 200))
  const setting = MOCK_SETTINGS.security.find(s => s.id === payload.id)
  if (setting) {
    if (payload.enabled !== undefined) setting.enabled = payload.enabled
    if (payload.value !== undefined) setting.value = payload.value
  }
  return { message: "ok", data: { id: payload.id } }
}
