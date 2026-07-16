export type NotificationCategory = "properties" | "documents"

export type INotification = {
  id: string
  icon: "payment" | "chat" | "document"
  title: string
  subtitle: string
  description: string
  action_label: string
  action_urgent?: boolean
  timestamp: string
  category: NotificationCategory
}
