import { ApiSuccessResponse } from "@/types/api.types"
import { IConversation, IMessage, SendMessageRequest } from "@/types/support.types"

// TODO: replace with real API calls once the backend endpoint is ready.
// import { http } from "@/utils/axios"

const MOCK_CONVERSATIONS: IConversation[] = [
  {
    id: "c1",
    client_name: "Lizzy Dahunsi",
    subject: "The Haven conversation",
    status: "online",
    last_message_at: "2026-07-07T09:00:00.000Z",
  },
  {
    id: "c2",
    client_name: "Michael Wilfield",
    subject: "The Haven conversation",
    status: "offline",
    last_message_at: "2026-01-13T00:00:00.000Z",
  },
]

const MOCK_MESSAGES: Record<string, IMessage[]> = {
  c1: [
    {
      id: "m1",
      conversation_id: "c1",
      sender_id: "s1",
      sender_name: "Sarah K.",
      sender_role: "Property Manager",
      is_self: false,
      body: "Hello James, I've just uploaded the Q3 valuation report for the Lekki Pearl unit. Overall, we're seeing a 12% appreciation since the last cycle. Would you like to review it now?",
      created_at: "2026-07-07T10:20:00.000Z",
    },
    {
      id: "m2",
      conversation_id: "c1",
      sender_id: "me",
      sender_name: "Me",
      is_self: true,
      body: "That's excellent news, Sarah. Please send it over. I'm also interested in seeing the maintenance logs for last month.",
      created_at: "2026-07-07T10:22:00.000Z",
    },
    {
      id: "m3",
      conversation_id: "c1",
      sender_id: "s1",
      sender_name: "Sarah K.",
      sender_role: "Property Manager",
      is_self: false,
      body: "Certainly. Here is the valuation report. I'm pulling the maintenance logs now.",
      attachment: {
        name: "Q3_Valuation_Lekki_Pearl.pdf",
        size_label: "2.4 MB",
        url: "#",
      },
      created_at: "2026-07-07T10:24:00.000Z",
    },
  ],
  c2: [
    {
      id: "m4",
      conversation_id: "c2",
      sender_id: "s2",
      sender_name: "Michael Wilfield",
      sender_role: "Property Manager",
      is_self: false,
      body: "Hi, just checking in on the unit handover timeline.",
      created_at: "2026-01-13T09:00:00.000Z",
    },
  ],
}

export async function getConversations(): Promise<
  ApiSuccessResponse<{ items: IConversation[] }>
> {
  // const res = await http.get("/api/support/conversations")
  // return res.data

  await new Promise(resolve => setTimeout(resolve, 300))

  return { message: "ok", data: { items: MOCK_CONVERSATIONS } }
}

export async function getConversationMessages(
  conversationId: string
): Promise<ApiSuccessResponse<{ items: IMessage[] }>> {
  // const res = await http.get(`/api/support/conversations/${conversationId}/messages`)
  // return res.data

  await new Promise(resolve => setTimeout(resolve, 300))

  return { message: "ok", data: { items: MOCK_MESSAGES[conversationId] ?? [] } }
}

export async function sendMessage(
  payload: SendMessageRequest
): Promise<ApiSuccessResponse<IMessage>> {
  // const { conversation_id, ...rest } = payload
  // const res = await http.post(`/api/support/conversations/${conversation_id}/messages`, rest)
  // return res.data

  await new Promise(resolve => setTimeout(resolve, 300))

  const message: IMessage = {
    id: `m${Date.now()}`,
    conversation_id: payload.conversation_id,
    sender_id: "me",
    sender_name: "Me",
    is_self: true,
    body: payload.body,
    created_at: new Date().toISOString(),
  }

  MOCK_MESSAGES[payload.conversation_id] = [
    ...(MOCK_MESSAGES[payload.conversation_id] ?? []),
    message,
  ]

  return { message: "ok", data: message }
}
