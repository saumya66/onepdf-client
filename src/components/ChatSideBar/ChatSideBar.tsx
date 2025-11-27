import { useState, useEffect } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useConversations, useCreateConversation } from '@/hooks/queries/useChatQueries'
import { ChatBox } from './ChatBox'

export function ChatSideBar() {
  const [activeConversationId, setActiveConversationId] = useState<string>('')
  
  // Fetch conversations on component mount
  const { data: conversations, refetch: refetchConversations } = useConversations()
  
  // Create conversation mutation
  const createConversationMutation = useCreateConversation()
  
  useEffect(() => {
    if (conversations && conversations.length > 0 && !activeConversationId) {
      // Set first conversation as active by default
      setActiveConversationId(conversations[0].id)
      console.log('Conversations loaded:', conversations)
    }
  }, [conversations, activeConversationId])
  
  const handleNewConversation = async () => {
    try {
      // Create new conversation via API
      const newConversation = await createConversationMutation.mutateAsync({})
      
      // Refetch conversations to update the list
      await refetchConversations()
      
      // Switch to the new conversation
      setActiveConversationId(newConversation.id)
    } catch (error) {
      console.error('Error creating new conversation:', error)
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
      <div className="overflow-x-auto scrollbar-hide">
        <TabsList className='p-0 pt-4 h-full'>
          {conversations.map((conversation) => (
            <TabsTrigger className='rounded-t-lg py-2' key={conversation.id} value={conversation.id}>
              {conversation.title}
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

