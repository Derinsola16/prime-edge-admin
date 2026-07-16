"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Search, Download, UserX, Trash2, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { getAdminMetrics, getAdmins, deleteAdmin } from "@/services/api/admin"
import { AdminMetrics } from "@/components/admin/admin-metrics"
import { InviteMemberDialog } from "@/components/admin/invite-member-dialog"
import { CreateRoleDialog } from "@/components/admin/create-role-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminManagementPage() {
  const queryClient = useQueryClient()
  const [inviteOpen, setInviteOpen] = useState(false)
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)

  const { data: metricsRes } = useQuery({
    queryKey: ["admin-metrics"],
    queryFn: getAdminMetrics,
  })
  const { data: adminsRes, isLoading } = useQuery({ queryKey: ["admins"], queryFn: getAdmins })

  const deleteMutation = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      toast.success("Admin removed")
      queryClient.invalidateQueries({ queryKey: ["admins"] })
    },
  })

  const admins = adminsRes?.data.items ?? []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Admin Management
        </h1>

        <DropdownMenu>
          <DropdownMenuTrigger
            className={buttonVariants({
              className: "rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover",
            })}
          >
            Add New Member
            <ChevronDown className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setInviteOpen(true)}>
              Invite New Team Member
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRoleDialogOpen(true)}>
              Create Custom Role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {metricsRes && <AdminMetrics metrics={metricsRes.data} />}

      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Admin List</h2>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by name title or amount" className="h-10 pl-9" />
            </div>
            <Button variant="outline" size="sm">
              <Download className="size-4" />
              Download CSV
            </Button>
          </div>

          {isLoading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Loading admins…</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="w-8 py-3">
                    <input type="checkbox" className="accent-brand-deepblue" />
                  </th>
                  <th className="py-3 font-medium">Admin Name</th>
                  <th className="py-3 font-medium">Role Access</th>
                  <th className="py-3 font-medium">Status</th>
                  <th className="py-3 font-medium">Last Seen</th>
                  <th className="py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.id} className="border-b border-border last:border-0">
                    <td className="py-4">
                      <input type="checkbox" className="accent-brand-deepblue" />
                    </td>
                    <td className="py-4 font-medium text-foreground">{admin.name}</td>
                    <td className="py-4 text-muted-foreground">{admin.role}</td>
                    <td className="py-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-full text-xs font-medium",
                          admin.status === "active"
                            ? "border-success text-success"
                            : "border-orange-400 text-orange-500"
                        )}
                      >
                        {admin.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="py-4 text-muted-foreground">{admin.last_seen}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <button aria-label="Deactivate">
                          <UserX className="size-4 text-muted-foreground" />
                        </button>
                        <button
                          aria-label="Remove"
                          onClick={() => deleteMutation.mutate(admin.id)}
                        >
                          <Trash2 className="size-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <p className="mt-6 text-sm text-muted-foreground">Showing 1-10 of 100 products</p>
        </div>
      </div>

      <InviteMemberDialog open={inviteOpen} onOpenChange={setInviteOpen} />
      <CreateRoleDialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen} />
    </div>
  )
}
