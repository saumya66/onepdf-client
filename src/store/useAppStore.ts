import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AppSection = 'quick' | 'workflow' | 'files' | 'dashboard'

interface AppState {
  activeSection: AppSection
  activeConversationId: string
  setActiveSection: (section: AppSection) => void
  setActiveConversationId: (conversationId: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeSection: 'quick',
      activeConversationId: '',
      
      setActiveSection: (section: AppSection) => {
        set({ activeSection: section })
      },
      
      setActiveConversationId: (conversationId: string) => {
        set({ activeConversationId: conversationId })
      },
    }),
    {
      name: 'app-storage', // localStorage key
    }
  )
)

