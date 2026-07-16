"use client"

import { Timer, Network, Lock, type LucideIcon } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { ISecuritySetting } from "@/types/settings.types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const icons: Record<ISecuritySetting["icon"], LucideIcon> = {
  timer: Timer,
  network: Network,
  lock: Lock,
}

export function SecuritySettingRow({
  setting,
  onToggle,
  onValueChange,
}: {
  setting: ISecuritySetting
  onToggle: (enabled: boolean) => void
  onValueChange: (value: string) => void
}) {
  const Icon = icons[setting.icon]

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Icon className="size-4" />
          {setting.category}
        </span>
        <Switch checked={setting.enabled} onCheckedChange={onToggle} />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-foreground">{setting.title}</p>
          <p className="text-xs text-muted-foreground">{setting.description}</p>
        </div>

        <Select value={setting.value} onValueChange={value => value && onValueChange(value)}>
          <SelectTrigger className="h-10 w-[260px] shrink-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {setting.options.map(option => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
