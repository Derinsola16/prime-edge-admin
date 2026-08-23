import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export function AdminStatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full text-xs font-medium",
        isActive ? "border-success text-success" : "border-orange-400 text-orange-500"
      )}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  )
}
