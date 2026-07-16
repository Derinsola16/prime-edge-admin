import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ICmsTestimonial } from "@/types/cms.types"

export function TestimonialCard({
  testimonial,
  onApprove,
  onReject,
}: {
  testimonial: ICmsTestimonial
  onApprove: () => void
  onReject: () => void
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
          {testimonial.full_name
            .split(" ")
            .map(n => n[0])
            .join("")}
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.full_name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.occupation}</p>
        </div>
      </div>

      <p className="mb-3 text-sm text-muted-foreground">&quot;{testimonial.testimony}&quot;</p>

      {testimonial.status === "new" ? (
        <div className="flex gap-2">
          <button
            onClick={onApprove}
            className="flex size-8 items-center justify-center rounded-full bg-success/10 text-success"
          >
            <Check className="size-4" />
          </button>
          <button
            onClick={onReject}
            className="flex size-8 items-center justify-center rounded-full bg-destructive/10 text-destructive"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <Badge
          variant="outline"
          className={cn(
            "rounded-full border-transparent text-xs font-medium",
            testimonial.status === "approved"
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          )}
        >
          {testimonial.status === "approved" ? "Approved" : "Rejected"}
        </Badge>
      )}
    </div>
  )
}
