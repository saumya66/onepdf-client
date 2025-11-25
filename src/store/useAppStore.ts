import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AppSection = 'quick' | 'workflow' | 'files' | 'dashboard'

interface AppState {
  activeSection: AppSection
  setActiveSection: (section: AppSection) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      activeSection: 'quick',
      
      setActiveSection: (section: AppSection) => {
        set({ activeSection: section })
      },
    }),
    {
      name: 'app-storage', // localStorage key
    }
  )
)

