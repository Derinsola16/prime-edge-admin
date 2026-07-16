"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { BellDot, BadgePlus, MessageSquare, FileText, ChevronRight, Building2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { getNotifications } from "@/services/api/notifications"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationCategory } from "@/types/notification.types"

const iconMap = { payment: BadgePlus, chat: MessageSquare, document: FileText }

export function NotificationsDrawer({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [tab, setTab] = useState<"all" | NotificationCategory>("all")

  const { data } = useQuery({ queryKey: ["notifications"], queryFn: getNotifications })
  const notifications = (data?.data.items ?? []).filter(
    n => tab === "all" || n.category === tab
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle>Notifications</SheetTitle>
              <p className="text-sm text-muted-foreground">Manage Admin updates</p>
            </div>
            <span className="flex size-10 items-center justify-center rounded-full border border-border">
              <BellDot className="size-5 text-foreground" />
            </span>
          </div>
        </SheetHeader>

        <Tabs value={tab} onValueChange={v => setTab(v as typeof tab)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="properties">
              <Building2 className="size-4" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="size-4" />
              Documents
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {notifications.map(notification => {
            const Icon = iconMap[notification.icon]

            return (
              <div
                key={notification.id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                    <Icon className="size-[18px]" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.subtitle}</p>
                  </div>
                </div>

                <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
                  {notification.description}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium",
                      notification.action_urgent
                        ? "bg-brand-deepblue text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {notification.action_label}
                    <ChevronRight className="size-3.5" />
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
