import { create } from 'zustand'
import type { Message } from '@/types/chat.types'

interface ChatState {
  messages: Record<string, Message[]> // conversationId -> messages[]
  setMessages: (conversationId: string, messages: Message[]) => void
  addMessage: (conversationId: string, message: Message) => void
  clearMessages: (conversationId: string) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: {},
  
  setMessages: (conversationId: string, messages: Message[]) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: messages,
      },
    }))
  },
  
  addMessage: (conversationId: string, message: Message) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), message],
      },
    }))
  },
  
  clearMessages: (conversationId: string) => {
    set((state) => {
      const newMessages = { ...state.messages }
      delete newMessages[conversationId]
      return { messages: newMessages }
    })
  },
}))

