import { useState, useEffect, useRef, useMemo } from 'react'
import { Bot, Send, User, Paperclip, X, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useMessages, useSendMessage, chatKeys } from '@/hooks/queries/useChatQueries'
import { useChatStore } from '@/store/useChatStore'
import type { Message, AssistantMessageContent } from '@/types/chat.types'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Sparkle } from '@/components/animate-ui/icons/sparkle'
import { useQueryClient } from '@tanstack/react-query'

interface ChatBoxProps {
  conversationId: string
}

export function ChatBox({ conversationId }: ChatBoxProps) {
  const [input, setInput] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const queryClient = useQueryClient()
  
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
    const filesToSend = uploadedFiles
    
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
    setUploadedFiles([])

    // Send message to API
    try {
      // Separate files by type
      const pdfs = filesToSend.filter(file => file.type === 'application/pdf')
      const images = filesToSend.filter(file => file.type.startsWith('image/'))
      const hasFiles = pdfs.length > 0 || images.length > 0

      const response = await sendMessageMutation.mutateAsync({
        user_message: userMessageContent,
        conversation_id: conversationId,
        pdfs: pdfs.length > 0 ? pdfs : undefined,
        images: images.length > 0 ? images : undefined,
      })

      // Add assistant's reply to store
      addMessage(conversationId, response.reply_message)
      
      // Refetch files if any were uploaded
      if (hasFiles) {
        queryClient.invalidateQueries({ queryKey: chatKeys.files(conversationId) })
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Optionally show error to user
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    
    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !sendMessageMutation.isPending) {
      e.preventDefault()
      handleSend()
    }
  }
  
  // Reset textarea height after sending
  useEffect(() => {
    if (input === '' && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [input])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setUploadedFiles(prev => [...prev, ...Array.from(files)])
    }
    console.log(files)
  }

  const handleAttachClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
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
        {/* File Previews */}
        {uploadedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {uploadedFiles.map((file, index) => {
              const isImage = file.type.startsWith('image/')
              const isPDF = file.type === 'application/pdf'
              
              return (
                <div
                  key={index}
                  className="relative flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 pr-8"
                >
                  {isImage ? (
                    <div className="w-12 h-12 rounded overflow-hidden bg-gray-200 dark:bg-gray-700">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : isPDF ? (
                    <div className="w-12 h-12 rounded bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  ) : null}
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* Input Row */}
        <div className="flex gap-2 items-end">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="flex-1 min-h-[40px] max-h-[150px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto"
            rows={1}
            disabled={sendMessageMutation.isPending}
          />
          
          <Button
            onClick={handleAttachClick}
            size="icon"
            variant="outline"
            className="flex-shrink-0"
            disabled={sendMessageMutation.isPending}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-emerald-600 hover:bg-emerald-700 flex-shrink-0"
            disabled={sendMessageMutation.isPending}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

