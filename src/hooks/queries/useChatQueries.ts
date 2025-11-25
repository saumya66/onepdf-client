import { useQuery } from '@tanstack/react-query'
import { chatApi } from '@/api/chat.api'

// Query keys
export const chatKeys = {
  all: ['chat'] as const,
  conversations: () => [...chatKeys.all, 'conversations'] as const,
  messages: (conversationId: string) => [...chatKeys.all, 'messages', conversationId] as const,
}

// Get all conversations
export const useConversations = () => {
  return useQuery({
    queryKey: chatKeys.conversations(),
    queryFn: chatApi.getConversations,
  })
}

// Get messages for a specific conversation
export const useMessages = (conversationId: string) => {
  return useQuery({
    queryKey: chatKeys.messages(conversationId),
    queryFn: () => chatApi.getMessages(conversationId),
    enabled: !!conversationId, // Only fetch if conversationId exists
  })
}

