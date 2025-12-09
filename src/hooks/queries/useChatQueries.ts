import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { chatApi } from '@/api/chat.api'
import type { SendMessageRequest, CreateConversationRequest, UpdateConversationRequest } from '@/types/chat.types'

// Query keys
export const chatKeys = {
  all: ['chat'] as const,
  conversations: () => [...chatKeys.all, 'conversations'] as const,
  messages: (conversationId: string) => [...chatKeys.all, 'messages', conversationId] as const,
  files: (conversationId: string) => [...chatKeys.all, 'files', conversationId] as const,
  fileDownload: (fileId: string) => [...chatKeys.all, 'fileDownload', fileId] as const,
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

// Send a message
export const useSendMessage = () => {
  return useMutation({
    mutationFn: (data: SendMessageRequest) => chatApi.sendMessage(data),
  })
}

// Create a new conversation
export const useCreateConversation = () => {
  return useMutation({
    mutationFn: (data?: CreateConversationRequest) => chatApi.createConversation(data),
  })
}

// Update a conversation
export const useUpdateConversation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ conversationId, data }: { conversationId: string; data: UpdateConversationRequest }) => 
      chatApi.updateConversation(conversationId, data),
    onSuccess: () => {
      // Invalidate conversations to refetch updated data
      queryClient.invalidateQueries({ queryKey: chatKeys.conversations() })
    },
  })
}

// Get files for a specific conversation
export const useConversationFiles = (conversationId: string) => {
  return useQuery({
    queryKey: chatKeys.files(conversationId),
    queryFn: () => chatApi.getConversationFiles(conversationId),
    enabled: !!conversationId,
  })
}

// Download a file (cached)
export const useFileDownload = (fileId: string | null) => {
  return useQuery({
    queryKey: chatKeys.fileDownload(fileId || ''),
    queryFn: async () => {
      const blob = await chatApi.downloadFile(fileId!)
      // Create URL for images, return blob for PDF
      const url = URL.createObjectURL(blob)
      return { blob, url }
    },
    enabled: !!fileId, // Only fetch when fileId is provided
    staleTime: Infinity, // Never consider data stale (keep cached)
    gcTime: 1000 * 60 * 30, // Keep in cache for 30 minutes (formerly cacheTime)
  })
}

