import apiClient from './client'
import type { Conversation, Message, MessagesResponse } from '@/types/chat.types'

export const chatApi = {
  // Get all conversations for the current user
  getConversations: async (): Promise<Conversation[]> => {
    const response = await apiClient.get<Conversation[]>('/chat/conversations')
    return response.data
  },

  // Get all messages for a specific conversation
  getMessages: async (conversationId: string): Promise<Message[]> => {
    const response = await apiClient.get<MessagesResponse>(`/chat/conversations/${conversationId}/messages`)
    return response.data.messages
  },
}

