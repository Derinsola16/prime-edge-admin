"use client"

import { Wallet, FileText, AlertTriangle, Bell, MessageCircle, type LucideIcon } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { INotificationSetting } from "@/types/settings.types"

const icons: Record<INotificationSetting["icon"], LucideIcon> = {
  wallet: Wallet,
  "file-text": FileText,
  alert: AlertTriangle,
  bell: Bell,
  message: MessageCircle,
}

export function NotificationSettingRow({
  setting,
  onToggle,
}: {
  setting: INotificationSetting
  onToggle: (enabled: boolean) => void
}) {
  const Icon = icons[setting.icon]

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border p-4">
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
          <Icon className="size-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">{setting.title}</p>
          <p className="text-xs text-muted-foreground">{setting.description}</p>
        </div>
      </div>

      <Switch checked={setting.enabled} onCheckedChange={onToggle} />
    </div>
  )
}
