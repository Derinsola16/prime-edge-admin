"use client"

import { toast } from "sonner"
import { useState } from "react"
import { Plus, Shield, CreditCard, ShieldCheck, Eye, User, LucideIcon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ROLE_OPTIONS, inviteTeamMember } from "@/services/api/admin"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const roleIcons: Record<string, LucideIcon> = {
  shield: Shield,
  "credit-card": CreditCard,
  "shield-check": ShieldCheck,
  eye: Eye,
}

export function InviteMemberDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const queryClient = useQueryClient()
  const [selectedRole, setSelectedRole] = useState("super_admin")

  const mutation = useMutation({
    mutationFn: inviteTeamMember,
    onSuccess: () => {
      toast.success("Invitation sent")
      queryClient.invalidateQueries({ queryKey: ["admins"] })
      onOpenChange(false)
    },
    onError: () => toast.error("Failed to send invitation"),
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] sm:max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invite New Team Member</DialogTitle>
          <DialogDescription>
            Set up access for a new member of your organization.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <User className="size-4" />
              Basic Information
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Title</label>
                <Input placeholder="Name" className="h-11" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Surname Name</label>
                <Input placeholder="Name" className="h-11" />
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <label className="text-sm font-medium text-foreground">Department</label>
              <Select>
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="client_success">Client Success</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Shield className="size-4" />
                Role &amp; Permissions
              </div>
              <button className="flex items-center gap-1 text-sm font-medium text-brand-skyblue">
                Add more Roles &amp; Permissions
                <Plus className="size-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {ROLE_OPTIONS.map(role => {
                const Icon = roleIcons[role.icon]
                const checked = selectedRole === role.id

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      "rounded-xl border border-border p-4 text-left",
                      checked && "border-brand-deepblue bg-brand-skyblue-ghost"
                    )}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex size-9 items-center justify-center rounded-full bg-card text-brand-deepblue">
                        <Icon className="size-4" />
                      </span>
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded border border-border",
                          checked && "border-brand-deepblue bg-brand-deepblue"
                        )}
                      >
                        {checked && (
                          <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
                            <path
                              d="M2 6l2.5 2.5L10 3"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{role.label}</p>
                    <p className="text-xs text-muted-foreground">{role.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              Security &amp; Access
            </div>
            <div className="space-y-3">
              {[
                {
                  title: "Admin Session Timeout",
                  note: "Automatically terminate inactive administrative sessions.",
                  defaultValue: "30 Minutes",
                  options: ["15 Minutes", "30 Minutes", "1 Hour"],
                },
                {
                  title: "Corporate IP Whitelisting",
                  note: "Restrict access to known office IP ranges for sensitive financial modules.",
                  defaultValue: "Strict (HQ Only)",
                  options: ["Strict (HQ Only)", "Relaxed (Any Location)"],
                },
                {
                  title: "Complexity Enforcement",
                  note: "Global requirement for admin password strength levels.",
                  defaultValue: "High (12+ Chars, Symbols)",
                  options: ["Standard (8+ Chars)", "High (12+ Chars, Symbols)"],
                },
              ].map(row => (
                <div
                  key={row.title}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{row.title}</p>
                    <p className="text-xs text-muted-foreground">{row.note}</p>
                  </div>
                  <Select defaultValue={row.defaultValue}>
                    <SelectTrigger className="h-10 w-[220px] shrink-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {row.options.map(opt => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">
            Cancel
          </Button>
          <Button
            disabled={mutation.isPending}
            onClick={() => mutation.mutate({ role: selectedRole })}
            className="rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
          >
            {mutation.isPending ? "Sending…" : "Send Invitation"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
