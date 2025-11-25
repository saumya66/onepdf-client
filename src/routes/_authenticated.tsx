import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/store/useAuthStore'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return (
    <div className="flex w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Outlet />
    </div>
  )
}

