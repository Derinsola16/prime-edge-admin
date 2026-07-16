import { ApiSuccessResponse } from "@/types/api.types"
import { INotification } from "@/types/notification.types"

// TODO: replace with a real API call once the backend endpoint is ready.
// import { http } from "@/utils/axios"

const MOCK_NOTIFICATIONS: INotification[] = [
  {
    id: "n1",
    icon: "payment",
    title: "Payment Update Processed",
    subtitle: "Lizzy Dahunsi",
    description:
      "Payment of ₦5M for 2-bedroom penthouse, Unit 8B has been paid by Lizzy Dahunsi",
    action_label: "View details",
    timestamp: "2 hour ago",
    category: "properties",
  },
  {
    id: "n2",
    icon: "chat",
    title: "New Chat Support from Ruona",
    subtitle: "Urgent feedback required",
    description:
      "I am currently stuck on the KYC documents, My Passport is not uploading on the system. I need help please",
    action_label: "Reply",
    action_urgent: true,
    timestamp: "2 hour ago",
    category: "documents",
  },
  {
    id: "n3",
    icon: "document",
    title: "KYC Submission",
    subtitle: "Aderinsola Odusanya",
    description: "Aderinsola Odusanya uploaded documents for KYC evaluation.",
    action_label: "View Documents",
    timestamp: "2 hour ago",
    category: "documents",
  },
  {
    id: "n4",
    icon: "document",
    title: "KYC Successfully Approved",
    subtitle: "2 hour ago",
    description: "An admin (Ayodele Gomes), approved a KYC submission",
    action_label: "View details",
    timestamp: "2 hour ago",
    category: "documents",
  },
]

export async function getNotifications(): Promise<
  ApiSuccessResponse<{ items: INotification[] }>
> {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { message: "ok", data: { items: MOCK_NOTIFICATIONS } }
}
