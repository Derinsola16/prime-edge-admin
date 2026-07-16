"use client"

import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { IConversation } from "@/types/support.types"

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: {
  conversations: IConversation[]
  selectedId?: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex w-full max-w-[394px] shrink-0 flex-col gap-4">
      <div className="rounded-lg bg-secondary p-4 text-sm text-foreground">
        Chat with clients and pick up your conversation where you left off.
      </div>

      <div className="flex flex-col gap-3">
        {conversations.map(conversation => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={cn(
              "flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-brand-skyblue",
              selectedId === conversation.id && "border-brand-skyblue"
            )}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-semibold text-foreground">
                {conversation.client_name[0]}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-foreground">
                  {conversation.client_name}
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  {conversation.subject}
                </span>
              </span>
            </div>

            <span className="flex shrink-0 flex-col items-end gap-2">
              <Badge
                variant="outline"
                className={cn(
                  "rounded-full border-0 text-xs font-medium",
                  conversation.status === "online"
                    ? "bg-success/10 text-success"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {conversation.status === "online" ? "Online" : "Offline"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {format(new Date(conversation.last_message_at), "dd/MM/yyyy")}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
