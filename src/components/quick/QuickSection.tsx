import { PDFViewer } from './PDFViewer'
import { ChatSideBar } from '@/components/ChatSideBar/ChatSideBar'

export function QuickSection() {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <PDFViewer />
      </div>

      <aside className="w-96 border-l dark:bg-emerald-950/20 flex flex-col overflow-hidden h-screen">
        <ChatSideBar />
      </aside>
    </div>
  )
}

