import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/store/useAuthStore'
import { LandingPage } from '@/components/landing/LandingPage'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    
    // Redirect to app if already authenticated
    if (isAuthenticated) {
      throw redirect({
        to: '/app',
      })
    }
  },
  component: LandingPage,
})

