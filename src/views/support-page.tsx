"use client"

import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { buttonVariants } from "@/components/ui/button"
import { ApiErrorResponse } from "@/types/api.types"
import { getAxiosErrorDetails } from "@/helpers/functions/axios"
import { ChatPanel } from "@/components/support/chat-panel"
import { ConversationList } from "@/components/support/conversation-list"
import {
  sendMessage,
  getConversations,
  getConversationMessages,
} from "@/services/api/support"

export default function SupportPage() {
  const queryClient = useQueryClient()
  const [explicitSelectedId, setExplicitSelectedId] = useState<string>()

  const { data: conversationsRes, isLoading: conversationsLoading } =
    useQuery({
      queryKey: ["support-conversations"],
      queryFn: getConversations,
    })

  const conversations = conversationsRes?.data.items ?? []
  const selectedId = explicitSelectedId ?? conversations[0]?.id

  const { data: messagesRes } = useQuery({
    queryKey: ["support-messages", selectedId],
    queryFn: () => getConversationMessages(selectedId!),
    enabled: !!selectedId,
  })

  const messages = messagesRes?.data.items ?? []

  const sendMutation = useMutation({
    mutationFn: sendMessage,
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(getAxiosErrorDetails(error) || "Failed to send message")
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["support-messages", selectedId],
      })
    },
  })

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Support
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

      {conversationsLoading ? (
        <p className="text-sm text-muted-foreground">Loading conversations…</p>
      ) : (
        <div className="flex flex-1 gap-6 overflow-hidden">
          <ConversationList
            conversations={conversations}
            selectedId={selectedId}
            onSelect={setExplicitSelectedId}
          />

          <ChatPanel
            messages={messages}
            isSending={sendMutation.isPending}
            conversation={conversations.find(c => c.id === selectedId)}
            onSend={body =>
              selectedId &&
              sendMutation.mutate({ conversation_id: selectedId, body })
            }
          />
        </div>
      )}
    </div>
  )
}
