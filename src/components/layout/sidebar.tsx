"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/shared/logo"
import { IUser } from "@/types/user.types"
import {
  primaryNavItems,
  secondaryNavItems,
  type NavItem,
} from "@/data/constants/navigation"

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={cn(
        "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted",
        active && "bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue"
      )}
    >
      {active && (
        <span className="absolute top-1/2 -left-4 h-6 w-1 -translate-y-1/2 rounded-full bg-brand-skyblue" />
      )}
      <Icon className="size-[18px] shrink-0" />
      <span className="truncate">{item.label}</span>
    </Link>
  )
}

export function Sidebar({ user }: { user?: IUser }) {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-[280px] shrink-0 flex-col border-r border-border bg-background">
      <div className="px-6 pt-6 pb-4">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
        {primaryNavItems.map(item => (
          <NavLink
            key={item.href}
            item={item}
            active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
          />
        ))}

        <div className="my-3 border-t border-border" />

        {secondaryNavItems.map(item => (
          <NavLink
            key={item.href}
            item={item}
            active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
          />
        ))}
      </nav>

      <div className="p-4">
        <button className="flex w-full items-center gap-3 rounded-lg border border-border bg-brand-skyblue-ghost p-3 text-left">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange-400 text-xs font-semibold text-white">
            {(user?.first_name?.[0] ?? "H") + (user?.last_name?.[0] ?? "4")}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-foreground">
              {user ? `${user.first_name} ${user.last_name}` : "Hannah 4President"}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {user?.email ?? "Hannah@president.com"}
            </span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </div>
    </aside>
  )
}
