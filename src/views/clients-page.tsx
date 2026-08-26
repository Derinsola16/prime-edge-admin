"use client"

import Link from "next/link"
import { toast } from "sonner"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Search, Eye, MoreHorizontal } from "lucide-react"

import { Input } from "@/components/ui/input"
import { buttonVariants } from "@/components/ui/button"
import { getClientMetrics, getUsers, deleteUser, toggleUserStatus } from "@/services/api/clients"
import { Pagination } from "@/components/shared/pagination"
import { ClientMetrics } from "@/components/clients/client-metrics"
import { AdminStatusBadge } from "@/components/admin/admin-status-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const filters: { label: string; value: "all" | "verified" | "unverified" }[] = [
  { label: "All", value: "all" },
  { label: "Verified", value: "verified" },
  { label: "Unverified", value: "unverified" },
]

const PAGE_SIZE = 10

export default function ClientsPage() {
  const queryClient = useQueryClient()
  const [filter, setFilter] = useState<"all" | "verified" | "unverified">("all")
  const [page, setPage] = useState(1)

  const { data: metricsRes } = useQuery({
    queryKey: ["client-metrics"],
    queryFn: getClientMetrics,
  })
  const { data: usersRes, isLoading } = useQuery({
    queryKey: ["users", page, filter],
    queryFn: () =>
      getUsers({
        page,
        limit: PAGE_SIZE,
        isVerified: filter === "all" ? undefined : filter === "verified",
      }),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User removed")
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: () => toast.error("Failed to remove user"),
  })

  const toggleStatusMutation = useMutation({
    mutationFn: toggleUserStatus,
    onSuccess: () => {
      toast.success("Status updated")
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: () => toast.error("Failed to update status"),
  })

  const users = usersRes?.items ?? []
  const total = usersRes?.total ?? 0
  const pages = usersRes?.pages ?? 1

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Client Management
        </h1>
        <Link
          href="/properties/add"
          className={buttonVariants({
            className: "rounded-full bg-brand-deepblue text-primary-foreground hover:bg-brand-deepblue-hover",
          })}
        >
          Create A Property
        </Link>
      </div>

      {metricsRes && <ClientMetrics metrics={metricsRes.data} />}

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Clients</h2>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-full bg-muted p-1">
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => {
                  setFilter(f.value)
                  setPage(1)
                }}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === f.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or email" className="h-10 pl-9" disabled />
          </div>
        </div>

        {isLoading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Loading clients…</p>
        ) : users.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No clients found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="py-3 font-medium">Name</th>
                <th className="py-3 font-medium">Email</th>
                <th className="py-3 font-medium">Country</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Join Date</th>
                <th className="w-16 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-border last:border-0">
                  <td className="py-4 font-medium text-foreground">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="py-4 text-muted-foreground">{user.email}</td>
                  <td className="py-4 text-muted-foreground">{user.address?.country ?? "—"}</td>
                  <td className="py-4">
                    <AdminStatusBadge isActive={user.isActive} />
                  </td>
                  <td className="py-4 text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <Link href={`/clients/${user.id}`}>
                        <Eye className="size-4 text-muted-foreground" />
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="text-muted-foreground">
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => toggleStatusMutation.mutate(user.id)}
                          >
                            {user.isActive ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => deleteMutation.mutate(user.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {total > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, total)} of {total}{" "}
              clients
            </p>
            <Pagination page={page} totalPages={pages} onPageChange={setPage} />
          </div>
        )}
      </div>
    </div>
  )
}
