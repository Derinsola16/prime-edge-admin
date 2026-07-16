export type INotificationSetting = {
  id: string
  title: string
  description: string
  icon: "wallet" | "file-text" | "alert" | "bell" | "message"
  enabled: boolean
}

export type ISecuritySetting = {
  id: string
  icon: "timer" | "network" | "lock"
  category: string
  title: string
  description: string
  enabled: boolean
  value: string
  options: string[]
}

export type ISettings = {
  notifications: INotificationSetting[]
  security: ISecuritySetting[]
}
