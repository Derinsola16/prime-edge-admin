export type AdminRole = "admin" | "editor" | "viewer"

export type AdminPermission =
  | "manage_content"
  | "manage_projects"
  | "manage_products"
  | "manage_users"
  | "manage_inquiries"
  | "view_analytics"

export type IAdminUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: AdminRole
  permissions: AdminPermission[]
  avatar?: string
  isActive: boolean
  createdAt: string
}

export type IAdminMetrics = {
  total: number
  admin: number
  editor: number
  viewer: number
}

export type ICreateAdminRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: AdminRole
  permissions: AdminPermission[]
}

export type IUpdateAdminRequest = {
  firstName?: string
  lastName?: string
  phone?: string
  role?: AdminRole
  permissions?: AdminPermission[]
}

export const ROLE_OPTIONS: { value: AdminRole; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
]

export const PERMISSION_OPTIONS: { value: AdminPermission; label: string }[] = [
  { value: "manage_content", label: "Manage Content" },
  { value: "manage_projects", label: "Manage Projects" },
  { value: "manage_products", label: "Manage Products" },
  { value: "manage_users", label: "Manage Users" },
  { value: "manage_inquiries", label: "Manage Inquiries" },
  { value: "view_analytics", label: "View Analytics" },
]
