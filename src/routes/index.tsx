import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/useAuthStore'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center space-y-8 p-8 max-w-4xl">
        <div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            OnePDF
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Your all-in-one PDF management solution
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link to="/login">
            <Button size="lg" variant="default">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" variant="outline">
              Sign Up
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-white/50 dark:bg-gray-950/50 rounded-lg backdrop-blur">
            <h3 className="font-semibold text-lg mb-2">🚀 Fast & Efficient</h3>
            <p className="text-sm text-muted-foreground">
              Process your PDFs quickly with our optimized backend
            </p>
          </div>
          <div className="p-6 bg-white/50 dark:bg-gray-950/50 rounded-lg backdrop-blur">
            <h3 className="font-semibold text-lg mb-2">🔒 Secure</h3>
            <p className="text-sm text-muted-foreground">
              Your documents are protected with enterprise-grade security
            </p>
          </div>
          <div className="p-6 bg-white/50 dark:bg-gray-950/50 rounded-lg backdrop-blur">
            <h3 className="font-semibold text-lg mb-2">☁️ Cloud-Based</h3>
            <p className="text-sm text-muted-foreground">
              Access your PDFs anywhere, anytime from any device
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

