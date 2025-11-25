export interface Conversation {
  id: string
  user_id: string
  title: string
  mode: string
  created_at: string
  updated_at: string
}

export interface AssistantMessageContent {
  workflow: unknown | null
  reply_text_message: string
  should_trigger_workflow: boolean
}

export interface Message {
  id: string
  conversation_id: string
  sender: 'user' | 'assistant'
  message: string | AssistantMessageContent
  created_at: string
}

export interface MessagesResponse {
  messages: Message[]
  total: number
  skip: number
  limit: number
}

