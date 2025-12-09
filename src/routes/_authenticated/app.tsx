
import { AppSidebar } from '@/components/app-sidebar'
import { QuickSection } from '@/components/quick/QuickSection'
import { WorkflowSection } from '@/components/workflow/WorkflowSection'
import { FileViewer } from '@/components/files/FileViewer'
import { Dashboard } from '@/components/dashboard/Dashboard'
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar'
import { createFileRoute } from '@tanstack/react-router'
import { useAppStore } from '@/store/useAppStore'

export const Route = createFileRoute('/_authenticated/app')({
  component: AppPage,
})

function AppPage() {
  const { activeSection } = useAppStore()

  const renderSection = () => {
    switch (activeSection) {
      case 'quick':
        return <QuickSection />
      case 'workflow':
        return <WorkflowSection />
      case 'files':
        return <FileViewer />
      case 'dashboard':
        return <Dashboard />
      default:
        return <QuickSection />
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset> 
        {renderSection()}
      </SidebarInset>
    </SidebarProvider>
  )
}



