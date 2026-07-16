export type ConversationStatus = "online" | "offline"

export type IConversation = {
  id: string
  client_name: string
  client_avatar_url?: string
  subject: string
  status: ConversationStatus
  last_message_at: string
}

export type IMessage = {
  id: string
  conversation_id: string
  sender_id: string
  sender_name: string
  sender_role?: string
  is_self: boolean
  body: string
  attachment?: {
    name: string
    size_label: string
    url: string
  }
  created_at: string
}

export type SendMessageRequest = {
  conversation_id: string
  body: string
}
