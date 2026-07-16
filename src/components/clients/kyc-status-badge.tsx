import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { KycStatus } from "@/types/client.types"

const labels: Record<KycStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
}

const classNames: Record<KycStatus, string> = {
  pending: "border-orange-400 text-orange-500 bg-transparent",
  approved: "border-success text-success bg-transparent",
  rejected: "border-destructive text-destructive bg-transparent",
}

export function KycStatusBadge({ status }: { status: KycStatus }) {
  return (
    <Badge variant="outline" className={cn("rounded-full text-xs font-medium", classNames[status])}>
      {labels[status]}
    </Badge>
  )
}
