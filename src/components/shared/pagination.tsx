import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const pages = Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1)
  const showEllipsis = totalPages > 5

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="size-4" />
        Previous
      </Button>

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={cn(
            "flex size-8 items-center justify-center rounded-md text-sm font-medium",
            p === page
              ? "border border-brand-deepblue text-brand-deepblue"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          {p}
        </button>
      ))}

      {showEllipsis && (
        <>
          <span className="text-muted-foreground">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className={cn(
              "flex size-8 items-center justify-center rounded-md text-sm font-medium",
              page === totalPages
                ? "border border-brand-deepblue text-brand-deepblue"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            {totalPages}
          </button>
        </>
      )}

      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}
