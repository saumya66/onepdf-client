import { WorkflowCanvas } from './WorkflowCanvas'
// import { ChatSideBar } from '@/components/ChatSideBar/ChatSideBar'

export function WorkflowSection() {
  return (
    <div className="flex w-full h-full">
      <div className="flex-1 flex flex-col overflow-hidden">
        <WorkflowCanvas />
      </div>

      <aside className="w-96 border-l bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-col overflow-hidden">
        {/* <ChatSideBar /> */}
      </aside>
    </div>
  )
}

