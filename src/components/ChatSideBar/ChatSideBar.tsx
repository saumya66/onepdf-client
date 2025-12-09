import { useState, useEffect, useRef } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useConversations, useCreateConversation, useUpdateConversation } from '@/hooks/queries/useChatQueries'
import { ChatBox } from './ChatBox'
import { useAppStore } from '@/store/useAppStore'

export function ChatSideBar() {
  const [activeConversationId, setActiveConversationId] = useState<string>('')
  const [editingConversationId, setEditingConversationId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState<string>('')
  const tabsScrollRef = useRef<HTMLDivElement>(null)
  const editInputRef = useRef<HTMLInputElement>(null)
  const setGlobalActiveConversationId = useAppStore(state => state.setActiveConversationId)
  
  // Fetch conversations on component mount
  const { data: conversations, refetch: refetchConversations } = useConversations()
  
  // Create conversation mutation
  const createConversationMutation = useCreateConversation()
  
  // Update conversation mutation
  const updateConversationMutation = useUpdateConversation()
  
  // Focus input when editing starts
  useEffect(() => {
    if (editingConversationId && editInputRef.current) {
      editInputRef.current.focus()
      editInputRef.current.select()
    }
  }, [editingConversationId])
  
  useEffect(() => {
    if (conversations && conversations.length > 0 && !activeConversationId) {
      // Set first conversation as active by default
      setActiveConversationId(conversations[0].id)
      setGlobalActiveConversationId(conversations[0].id)
      console.log('Conversations loaded:', conversations)
    }
  }, [conversations, activeConversationId, setGlobalActiveConversationId])
  
  // Sync active conversation ID to global store
  useEffect(() => {
    if (activeConversationId) {
      setGlobalActiveConversationId(activeConversationId)
    }
  }, [activeConversationId, setGlobalActiveConversationId])
  
  const handleNewConversation = async () => {
    try {
      // Create new conversation via API
      const newConversation = await createConversationMutation.mutateAsync({})
      
      // Refetch conversations to update the list
      await refetchConversations()
      
      // Switch to the new conversation
      setActiveConversationId(newConversation.id)
      
      // Scroll tabs to the left (start)
      setTimeout(() => {
        if (tabsScrollRef.current) {
          tabsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        }
      }, 100)
    } catch (error) {
      console.error('Error creating new conversation:', error)
    }
  }
  
  const handleDoubleClick = (conversationId: string, currentTitle: string) => {
    setEditingConversationId(conversationId)
    setEditingTitle(currentTitle)
  }
  
  const handleSaveTitle = async () => {
    if (!editingConversationId || !editingTitle.trim()) {
      setEditingConversationId(null)
      return
    }

    if (editingTitle.trim() === conversations?.find(conversation => conversation.id === editingConversationId)?.title) {
      setEditingConversationId(null)
      return
    }
    
    try {
      await updateConversationMutation.mutateAsync({
        conversationId: editingConversationId,
        data: { title: editingTitle.trim() },
      })
    } catch (error) {
      console.error('Error updating conversation title:', error)
    } finally {
      setEditingConversationId(null)
    }
  }
  
  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSaveTitle()
    } else if (e.key === 'Escape') {
      setEditingConversationId(null)
    }
  }
  
  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <ChatBox conversationId={activeConversationId} />
      </div>
    )
  }

  return (
    <Tabs value={activeConversationId} onValueChange={setActiveConversationId} className="flex flex-col h-full">
      <div ref={tabsScrollRef} className="overflow-x-auto scrollbar-hide">
        <TabsList className='p-0 pt-4 h-full'>
          {conversations.map((conversation) => (
            <TabsTrigger 
              className='rounded-t-lg py-2' 
              key={conversation.id} 
              value={conversation.id}
              onDoubleClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleDoubleClick(conversation.id, conversation.title)
              }}
            >
              {editingConversationId === conversation.id ? (
                <input
                  ref={editInputRef}
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={handleSaveTitle}
                  onKeyDown={handleEditKeyDown}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-transparent border-b border-current outline-none text-center min-w-[60px] max-w-[150px]"
                  style={{ width: `${Math.max(60, editingTitle.length * 8)}px` }}
                />
              ) : (
                conversation.title
              )}
            </TabsTrigger>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 ml-2"
            onClick={handleNewConversation}
            disabled={createConversationMutation.isPending}
          >
            {createConversationMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </TabsList>
      </div>

      {/* Tab Content */}
      {conversations.map((conversation) => (
        <TabsContent
          key={conversation.id}
          value={conversation.id}
          className="flex-1 m-0 overflow-hidden data-[state=inactive]:hidden"
        >
          <ChatBox conversationId={conversation.id} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

