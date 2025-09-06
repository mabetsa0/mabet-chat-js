'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { ChatInfo } from '@/@types/chat-info-response'

const ChatContext = createContext<ChatInfo | null>(null)

interface ChatProviderProps {
  children: ReactNode
  chatData: ChatInfo | null
}

export const ChatProvider = ({ children, chatData }: ChatProviderProps) => {
  return (
    <ChatContext.Provider value={chatData}>{children}</ChatContext.Provider>
  )
}

export const useChatData = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatData must be used within a ChatProvider')
  }
  return context
}
