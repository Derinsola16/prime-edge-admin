import { format } from "date-fns"
import { FileText, Download } from "lucide-react"

import { cn } from "@/lib/utils"
import { IMessage } from "@/types/support.types"

export function MessageBubble({ message }: { message: IMessage }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        message.is_self ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "max-w-[520px] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          message.is_self
            ? "rounded-tr-sm bg-brand-skyblue text-white"
            : "rounded-tl-sm border border-border bg-card text-foreground"
        )}
      >
        {message.body}

        {message.attachment && (
          <div className="mt-2 flex items-center gap-3 rounded-lg bg-background/90 p-2.5 text-foreground">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive">
              <FileText className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium">
                {message.attachment.name}
              </span>
              <span className="block text-xs text-muted-foreground">
                {message.attachment.size_label}
              </span>
            </span>
            <Download className="size-4 shrink-0 text-muted-foreground" />
          </div>
        )}
      </div>

      <span className="px-1 text-xs text-muted-foreground">
        {format(new Date(message.created_at), "h:mm a")}
      </span>
    </div>
  )
}
