import { IUser } from "@/types/user.types"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"

export function AppShell({
  user,
  children,
}: {
  user?: IUser
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-secondary/40">
      <Sidebar user={user} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} />

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  )
}
