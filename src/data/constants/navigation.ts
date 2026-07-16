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

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

export const primaryNavItems: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Property Manager", href: "/properties", icon: Briefcase },
  { label: "Finance Center", href: "/finance", icon: Landmark },
  { label: "Client Management", href: "/clients", icon: Users },
  { label: "Website CMS", href: "/cms", icon: LayoutGrid },
  { label: "Analytics", href: "/analytics", icon: LineChart },
  { label: "Admin Management", href: "/admin-management", icon: UserCog },
]

export const secondaryNavItems: NavItem[] = [
  { label: "Support", href: "/support", icon: MessageCircle },
  { label: "Settings", href: "/settings", icon: Settings },
]
