"use client"

import { toast } from "sonner"
import { useState } from "react"
import { Users, Briefcase, Landmark, Settings, LucideIcon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PERMISSION_MODULES, createCustomRole } from "@/services/api/admin"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const moduleIcons: Record<string, LucideIcon> = {
  users: Users,
  briefcase: Briefcase,
  landmark: Landmark,
  settings: Settings,
}

export function CreateRoleDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const queryClient = useQueryClient()
  const [roleName, setRoleName] = useState("")
  const [description, setDescription] = useState("")
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const togglePermission = (permission: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(permission)) next.delete(permission)
      else next.add(permission)
      return next
    })
  }

  const mutation = useMutation({
    mutationFn: createCustomRole,
    onSuccess: () => {
      toast.success("A new role has been created successfully")
      queryClient.invalidateQueries({ queryKey: ["admins"] })
      onOpenChange(false)
      setRoleName("")
      setDescription("")
      setSelected(new Set())
    },
    onError: () => toast.error("Failed to create role"),
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] sm:max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Custom Role</DialogTitle>
          <DialogDescription>
            Define organizational access levels and granular permissions.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-[220px_1fr] gap-8">
          <div>
            <p className="text-sm font-semibold text-foreground">Role Basics</p>
            <p className="text-sm text-muted-foreground">
              Identify the role with a clear name and scope of responsibility.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Role Name</label>
              <Input
                placeholder="Type in or select"
                className="h-11"
                value={roleName}
                onChange={e => setRoleName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Role Description</label>
              <Textarea
                placeholder="Type your description here."
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Permissions</p>
            <p className="text-sm text-muted-foreground">
              Select granular access controls for each module.
            </p>
          </div>
          <div className="space-y-5">
            {PERMISSION_MODULES.map(module => {
              const Icon = moduleIcons[module.icon]

              return (
                <div key={module.id} className="border-b border-border pb-4 last:border-0">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Icon className="size-4" />
                    {module.label}
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {module.permissions.map(permission => (
                      <label
                        key={permission}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <input
                          type="checkbox"
                          checked={selected.has(permission)}
                          onChange={() => togglePermission(permission)}
                          className="accent-brand-deepblue"
                        />
                        {permission}
                      </label>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-full border-brand-deepblue text-brand-deepblue"
          >
            Cancel
          </Button>
          <Button
            disabled={mutation.isPending}
            onClick={() =>
              mutation.mutate({
                role_name: roleName,
                description,
                permissions: Array.from(selected),
              })
            }
            className="rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
          >
            {mutation.isPending ? "Creating…" : "Create Role"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
