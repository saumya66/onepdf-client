import { useState, useEffect, useRef, useMemo } from 'react'
import { Bot, Send, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useMessages, useSendMessage } from '@/hooks/queries/useChatQueries'
import { useChatStore } from '@/store/useChatStore'
import type { Message, AssistantMessageContent } from '@/types/chat.types'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Sparkle } from '@/components/animate-ui/icons/sparkle'

interface ChatBoxProps {
  conversationId: string
}

export function ChatBox({ conversationId }: ChatBoxProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Get messages from store
  const { messages: messagesStore, setMessages, addMessage } = useChatStore()
  const conversationMessages = useMemo(
    () => messagesStore[conversationId] || [],
    [messagesStore, conversationId]
  )
  
  // Fetch messages from API
  const { data: fetchedMessages } = useMessages(conversationId)
  
  // Send message mutation
  const sendMessageMutation = useSendMessage()
  
  // Update store when messages are fetched
  useEffect(() => {
    if (fetchedMessages && fetchedMessages.length > 0) {
      setMessages(conversationId, fetchedMessages)
    }
  }, [fetchedMessages, conversationId, setMessages])
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversationMessages])

  const handleSend = async () => {
    if (!input.trim() || sendMessageMutation.isPending || !conversationId) return

    const userMessageContent = input
    
    const userMessage: Message = {
      id: Date.now().toString(),
      conversation_id: conversationId,
      sender: 'user',
      message: userMessageContent,
      created_at: new Date().toISOString(),
    }

    // Add user message to store immediately (optimistic update)
    addMessage(conversationId, userMessage)
    setInput('')

    // Send message to API
    try {
      const response = await sendMessageMutation.mutateAsync({
        user_message: userMessageContent,
        conversation_id: conversationId,
        // TODO: Add pdfs and images arrays when file upload is implemented
      })

      // Add assistant's reply to store
      addMessage(conversationId, response.reply_message)
    } catch (error) {
      console.error('Error sending message:', error)
      // Optionally show error to user
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !sendMessageMutation.isPending) {
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-white dark:bg-gray-950 flex-shrink-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
          <Bot className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">AI Assistant</h3>
          <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversationMessages.map((message) => {
          const isUser = message.sender === 'user'
          const timestamp = new Date(message.created_at).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          })

          // Extract message content
          const messageContent = isUser
            ? (message.message as string)
            : (message.message as AssistantMessageContent).reply_text_message

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar className="h-8 w-8 flex-shrink-0">
                {isUser ? (
                  <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900">
                    <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </AvatarFallback>
                ) : (
                  <AvatarFallback className="bg-gray-100 dark:bg-gray-800">
                    <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </AvatarFallback>
                )}
              </Avatar>

              <div
                className={`flex flex-col gap-1 max-w-[80%] ${
                  isUser ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 ${
                    isUser
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{messageContent}</p>
                </div>
                <span className="text-xs text-gray-500">{timestamp}</span>
              </div>
            </div>
          )
        })}
        
        {/* AI is responding - show sparkle animation */}
        {sendMessageMutation.isPending && (
          <div className="flex gap-3 flex-row">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-gray-100 dark:bg-gray-800">
                <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1 max-w-[80%] items-start">
              <div className="rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <AnimateIcon animate={true} loop={true}>
                  <Sparkle className="h-5 w-5" />
                </AnimateIcon>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white dark:bg-gray-950 flex-shrink-0">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={sendMessageMutation.isPending}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

