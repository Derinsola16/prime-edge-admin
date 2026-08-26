import {
  Home,
  Briefcase,
  Landmark,
  Users,
  LayoutGrid,
  LineChart,
  UserCog,
  MessageCircle,
  Settings,
  type LucideIcon,
} from "lucide-react"

import { AdminRole } from "@/types/admin.types"

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  /** Only show this item to admins with one of these roles; omit to show to all roles. */
  restrictedTo?: AdminRole[]
}

export const primaryNavItems: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Property Manager", href: "/properties", icon: Briefcase },
  { label: "Finance Center", href: "/finance", icon: Landmark },
  { label: "Client Management", href: "/clients", icon: Users },
  { label: "Website CMS", href: "/cms", icon: LayoutGrid },
  { label: "Analytics", href: "/analytics", icon: LineChart },
  {
    label: "Admin Management",
    href: "/admin-management",
    icon: UserCog,
    restrictedTo: ["admin"],
  },
]

export const secondaryNavItems: NavItem[] = [
  { label: "Support", href: "/support", icon: MessageCircle },
  { label: "Settings", href: "/settings", icon: Settings },
]
