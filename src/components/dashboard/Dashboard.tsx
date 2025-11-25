import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/useAuthStore'
import { useLogout } from '@/hooks/queries/useAuthQueries'

export function Dashboard() {
  const { user } = useAuthStore()
  const handleLogout = useLogout()

  return (
    <div className="container mx-auto p-8 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {user?.name}!
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total PDFs
            </h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Processed Today
            </h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Storage Used
            </h3>
            <p className="text-3xl font-bold mt-2">0 MB</p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Name:</span>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Email:</span>
              <p className="font-medium">{user?.user_email}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">User ID:</span>
              <p className="font-mono text-sm">{user?.user_id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

