import apiClient from './client'
import type { Conversation, Message, MessagesResponse, SendMessageRequest, SendMessageResponse, CreateConversationRequest, CreateConversationResponse } from '@/types/chat.types'

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

  // Send a message
  sendMessage: async (data: SendMessageRequest): Promise<SendMessageResponse> => {
    // Create FormData for multipart/form-data request
    const formData = new FormData()
    
    formData.append('user_message', data.user_message)
    
    if (data.conversation_id) {
      formData.append('conversation_id', data.conversation_id)
    }
    
    // Add PDFs if provided
    if (data.pdfs && data.pdfs.length > 0) {
      data.pdfs.forEach((pdf) => {
        formData.append('pdfs', pdf)
      })
    }
    
    // Add images if provided
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append('images', image)
      })
    }
    
    const response = await apiClient.post<SendMessageResponse>('/chat', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Create a new conversation
  createConversation: async (data: CreateConversationRequest = {}): Promise<CreateConversationResponse> => {
    const response = await apiClient.post<CreateConversationResponse>('/chat/new-conversation', data)
    return response.data
  },
}

