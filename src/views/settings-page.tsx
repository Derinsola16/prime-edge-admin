"use client"

import Link from "next/link"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { buttonVariants } from "@/components/ui/button"
import { getSettings, updateNotificationSetting, updateSecuritySetting } from "@/services/api/settings"
import { SecuritySettingRow } from "@/components/settings/security-setting-row"
import { NotificationSettingRow } from "@/components/settings/notification-setting-row"

export default function SettingsPage() {
  const queryClient = useQueryClient()
  const { data } = useQuery({ queryKey: ["settings"], queryFn: getSettings })

  const notificationMutation = useMutation({
    mutationFn: updateNotificationSetting,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["settings"] }),
  })

  const securityMutation = useMutation({
    mutationFn: updateSecuritySetting,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["settings"] }),
  })

  const settings = data?.data

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-foreground">Settings</h1>
        <Link
          href="/properties/add"
          className={buttonVariants({
            className: "rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover",
          })}
        >
          Add New Property
        </Link>
      </div>

      {settings && (
        <>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Notification Settings
            </h2>
            <div className="space-y-3">
              {settings.notifications.map(setting => (
                <NotificationSettingRow
                  key={setting.id}
                  setting={setting}
                  onToggle={enabled =>
                    notificationMutation.mutate({ id: setting.id, enabled })
                  }
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Security Settings</h2>
            <div className="space-y-3">
              {settings.security.map(setting => (
                <SecuritySettingRow
                  key={setting.id}
                  setting={setting}
                  onToggle={enabled => securityMutation.mutate({ id: setting.id, enabled })}
                  onValueChange={value => securityMutation.mutate({ id: setting.id, value })}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
