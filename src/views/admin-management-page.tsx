"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getSessionUser } from "@/services/api/user"
import { IAdminUser } from "@/types/admin.types"
import { Pagination } from "@/components/shared/pagination"
import { AdminMetrics } from "@/components/admin/admin-metrics"
import { AdminStatusBadge } from "@/components/admin/admin-status-badge"
import { CreateAdminDialog } from "@/components/admin/create-admin-dialog"
import { EditPermissionsDialog } from "@/components/admin/edit-permissions-dialog"
import { ResetAdminPasswordDialog } from "@/components/admin/reset-admin-password-dialog"
import {
  getAdminMetrics,
  getAdmins,
  deleteAdmin,
  toggleAdminStatus,
} from "@/services/api/admin"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const PAGE_SIZE = 10

export default function AdminManagementPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<IAdminUser | null>(null)
  const [resetTarget, setResetTarget] = useState<IAdminUser | null>(null)

  const { data: sessionRes, isLoading: sessionLoading } = useQuery({
    queryKey: ["session-user"],
    queryFn: getSessionUser,
  })
  const role = sessionRes?.data.role
  const canManageAdmins = role === "superadmin" || role === "admin"

  useEffect(() => {
    if (!sessionLoading && role && !canManageAdmins) {
      router.replace("/dashboard")
    }
  }, [sessionLoading, role, canManageAdmins, router])

  const { data: metrics } = useQuery({
    queryKey: ["admin-metrics"],
    queryFn: getAdminMetrics,
    enabled: canManageAdmins,
  })

  const { data: adminsRes, isLoading } = useQuery({
    queryKey: ["admins", page],
    queryFn: () => getAdmins({ page, limit: PAGE_SIZE }),
    enabled: canManageAdmins,
  })

  const toggleStatusMutation = useMutation({
    mutationFn: toggleAdminStatus,
    onSuccess: () => {
      toast.success("Status updated")
      queryClient.invalidateQueries({ queryKey: ["admins"] })
      queryClient.invalidateQueries({ queryKey: ["admin-metrics"] })
    },
    onError: () => toast.error("Failed to update status"),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      toast.success("Admin removed")
      queryClient.invalidateQueries({ queryKey: ["admins"] })
      queryClient.invalidateQueries({ queryKey: ["admin-metrics"] })
    },
    onError: () => toast.error("Failed to remove admin"),
  })

  if (sessionLoading || (role && !canManageAdmins)) {
    return null
  }

  const admins = adminsRes?.items ?? []
  const total = adminsRes?.total ?? 0
  const pages = adminsRes?.pages ?? 1

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Admin Management
        </h1>

        <Button
          onClick={() => setCreateOpen(true)}
          className="rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover"
        >
          Add New Admin
        </Button>
      </div>

      {metrics && <AdminMetrics metrics={metrics} />}

      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Admin List</h2>

        <div className="rounded-xl border border-border bg-card p-6">
          {isLoading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Loading admins…</p>
          ) : admins.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No admins found.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-3 font-medium">Admin Name</th>
                  <th className="py-3 font-medium">Email</th>
                  <th className="py-3 font-medium">Role</th>
                  <th className="py-3 font-medium">Status</th>
                  <th className="py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.id} className="border-b border-border last:border-0">
                    <td className="py-4 font-medium text-foreground">
                      {admin.firstName} {admin.lastName}
                    </td>
                    <td className="py-4 text-muted-foreground">{admin.email}</td>
                    <td className="py-4 text-muted-foreground capitalize">{admin.role}</td>
                    <td className="py-4">
                      <AdminStatusBadge isActive={admin.isActive} />
                    </td>
                    <td className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="text-muted-foreground">
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditTarget(admin)}>
                            Edit Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setResetTarget(admin)}>
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toggleStatusMutation.mutate(admin.id)}
                          >
                            {admin.isActive ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => deleteMutation.mutate(admin.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {total > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, total)} of{" "}
                {total} admins
              </p>
              <Pagination page={page} totalPages={pages} onPageChange={setPage} />
            </div>
          )}
        </div>
      </div>

      <CreateAdminDialog open={createOpen} onOpenChange={setCreateOpen} />
      <EditPermissionsDialog
        key={editTarget?.id ?? "none"}
        admin={editTarget}
        open={editTarget !== null}
        onOpenChange={open => !open && setEditTarget(null)}
      />
      <ResetAdminPasswordDialog
        admin={resetTarget}
        open={resetTarget !== null}
        onOpenChange={open => !open && setResetTarget(null)}
      />
    </div>
  )
}
