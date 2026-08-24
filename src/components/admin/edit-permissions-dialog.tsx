"use client"

import { toast } from "sonner"
import { useState } from "react"
import { AxiosError } from "axios"
import { ShieldCheck } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { updateAdmin, getPermissionCatalog } from "@/services/api/admin"
import { ApiErrorResponse } from "@/types/api.types"
import { CreatableAdminRole, IAdminUser, ROLE_OPTIONS } from "@/types/admin.types"
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

export function EditPermissionsDialog({
  admin,
  open,
  onOpenChange,
}: {
  admin: IAdminUser | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const queryClient = useQueryClient()
  const [roleType, setRoleType] = useState<CreatableAdminRole>(
    (admin?.role as CreatableAdminRole) ?? "support"
  )
  const [permissions, setPermissions] = useState<string[]>(admin?.permissions ?? [])

  const { data: catalog = [] } = useQuery({
    queryKey: ["permission-catalog"],
    queryFn: getPermissionCatalog,
    enabled: open,
  })

  const isFullAccess = roleType === "admin"

  const togglePermission = (value: string) => {
    setPermissions(prev =>
      prev.includes(value) ? prev.filter(p => p !== value) : [...prev, value]
    )
  }

  const mutation = useMutation({
    mutationFn: () => {
      if (!admin) throw new Error("No admin selected")
      return updateAdmin(admin.id, {
        roleType,
        permissions: isFullAccess ? [] : permissions,
      })
    },
    onSuccess: () => {
      toast.success("Permissions updated")
      queryClient.invalidateQueries({ queryKey: ["admins"] })
      queryClient.invalidateQueries({ queryKey: ["admin-metrics"] })
      onOpenChange(false)
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Failed to update permissions")
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] sm:max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Permissions</DialogTitle>
          <DialogDescription>
            {admin ? `Update role and access for ${admin.firstName} ${admin.lastName}.` : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Role</label>
            <Select
              value={roleType}
              onValueChange={v => v && setRoleType(v as CreatableAdminRole)}
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {ROLE_OPTIONS.find(r => r.value === roleType)?.description}
            </p>
          </div>

          {isFullAccess ? (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary p-4 text-sm text-foreground">
              <ShieldCheck className="size-4 shrink-0 text-brand-deepblue" />
              Full access to every module — same as Super Admin.
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Permissions</label>
              <div className="max-h-64 space-y-4 overflow-y-auto rounded-lg border border-border p-4">
                {catalog.map(group => (
                  <div key={group.module}>
                    <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {group.label}
                    </p>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                      {group.permissions.map(permission => (
                        <label
                          key={permission.value}
                          className="flex items-center gap-2 text-sm text-foreground"
                        >
                          <Checkbox
                            checked={permissions.includes(permission.value)}
                            onCheckedChange={() => togglePermission(permission.value)}
                          />
                          {permission.label}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">
            Cancel
          </Button>
          <Button
            disabled={mutation.isPending}
            onClick={() => mutation.mutate()}
            className="rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
          >
            {mutation.isPending ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
