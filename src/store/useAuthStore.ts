import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthState, LoginResponse, User } from '@/types/auth.types'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      setAuth: (data: LoginResponse) => {
        const user: User = {
          user_id: data.user_id,
          user_email: data.user_email,
          name: data.name,
        }
        
        set({
          user,
          token: data.access_token,
          isAuthenticated: true,
        })
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
)

