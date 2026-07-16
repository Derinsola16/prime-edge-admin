"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, Bell, ChevronDown } from "lucide-react"

import { IUser } from "@/types/user.types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationsDrawer } from "@/components/layout/notifications-drawer"

export function Topbar({ user }: { user?: IUser }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <header className="flex h-16 shrink-0 items-center justify-end gap-4 border-b border-border bg-background px-6">
      <Button variant="ghost" size="icon" aria-label="Search">
        <Search className="size-[18px] text-muted-foreground" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Notifications"
        onClick={() => setNotificationsOpen(true)}
      >
        <Bell className="size-[18px] text-muted-foreground" />
      </Button>

      <div className="h-6 w-px bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground outline-none">
          <span>₦</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>₦ NGN</DropdownMenuItem>
          <DropdownMenuItem>$ USD</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="h-6 w-px bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
          <span className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-semibold text-foreground">
            {user?.first_name?.[0] ?? "A"}
          </span>
          <span className="text-sm font-medium text-foreground">
            {user?.first_name ?? "Admin"}
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem render={<Link href="/profile">Profile</Link>} />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <NotificationsDrawer open={notificationsOpen} onOpenChange={setNotificationsOpen} />
    </header>
  )
}
