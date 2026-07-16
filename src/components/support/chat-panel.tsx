"use client"

import { useState } from "react"
import { Calendar, Paperclip, ImageIcon, Send } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IConversation, IMessage } from "@/types/support.types"
import { MessageBubble } from "@/components/support/message-bubble"

export function ChatPanel({
  conversation,
  messages,
  onSend,
  isSending,
}: {
  conversation?: IConversation
  messages: IMessage[]
  onSend: (body: string) => void
  isSending?: boolean
}) {
  const [draft, setDraft] = useState("")

  const handleSend = () => {
    if (!draft.trim()) return
    onSend(draft.trim())
    setDraft("")
  }

  if (!conversation) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-border bg-card text-sm text-muted-foreground">
        Select a conversation to view messages
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-semibold text-foreground">
            {conversation.client_name[0]}
            {conversation.status === "online" && (
              <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-card bg-success" />
            )}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {conversation.client_name}
            </p>
            <p className="text-xs text-muted-foreground">
              {conversation.subject}
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="rounded-full bg-brand-skyblue-ghost text-brand-deepblue hover:bg-brand-skyblue-subtle"
        >
          <Calendar className="size-4" />
          Schedule a Call
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <div className="flex items-center gap-3 border-t border-border p-4">
        <Paperclip className="size-4 shrink-0 text-muted-foreground" />
        <ImageIcon className="size-4 shrink-0 text-muted-foreground" />
        <Input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleSend()
          }}
          placeholder="Type a message..."
          disabled={isSending}
          className="h-10 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
        <button
          onClick={handleSend}
          disabled={isSending}
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-deepblue text-white transition-opacity",
            isSending && "opacity-50"
          )}
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  )
}
