export type AdminRole = "superadmin" | "admin" | "support" | "custom"

/** Roles that can actually be created/assigned through the Admin Management UI. */
export type CreatableAdminRole = Exclude<AdminRole, "superadmin">

export type AdminPermission = string

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
  support: number
  custom: number
}

export type ICreateAdminRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
  roleType: CreatableAdminRole
  permissions: AdminPermission[]
}

export type IUpdateAdminRequest = {
  firstName?: string
  lastName?: string
  phone?: string
  roleType?: CreatableAdminRole
  permissions?: AdminPermission[]
}

export const ROLE_OPTIONS: {
  value: CreatableAdminRole
  label: string
  description: string
}[] = [
  {
    value: "admin",
    label: "Admin",
    description: "Full access — everything Super Admin can do, except managing the Super Admin account.",
  },
  {
    value: "support",
    label: "Support",
    description: "Access limited to whichever permissions are granted below.",
  },
  {
    value: "custom",
    label: "Custom",
    description: "Access limited to whichever permissions are granted below.",
  },
]

/** A single permission from the backend's permission catalog. */
export type PermissionCatalogEntry = {
  value: string
  label: string
}

/** Permissions grouped by module, as returned by GET /admin/permissions. */
export type PermissionCatalogGroup = {
  module: string
  label: string
  permissions: PermissionCatalogEntry[]
}
