export type AdminStatus = "active" | "inactive"

export type IAdminUser = {
  id: string
  name: string
  role: string
  status: AdminStatus
  last_seen: string
}

export type IAdminMetrics = {
  total_admin: number
  finance_admin: number
  client_managers: number
  super_admin: number
}

export type IRoleOption = {
  id: string
  label: string
  description: string
  icon: "shield" | "credit-card" | "shield-check" | "eye"
}

export type IPermissionModule = {
  id: string
  label: string
  icon: "users" | "briefcase" | "landmark" | "settings"
  permissions: string[]
}
