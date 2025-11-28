'use client'

import { useCallback, useEffect, useState } from 'react'

import { Conversation } from '@/@types/chats-response'
import { useSendEvent } from '@/hooks/use-send-event'
import { useWsEvent } from '@/hooks/use-ws-event'
import { WS_ON_EVENTS, WS_SEND_EVENTS } from '@/services/ws/events'
export const useWsChatsList = (accessToken: string) => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { sendEvent } = useSendEvent()

  const handleAuthenticated = useCallback(
    (data: {
      user_id: number
      user_type: string
      user_name: string
      unread_conversations_count: number
      first_conversations_page: Conversation[]
    }) => {
      setIsLoading(false)
      setConversations(data.first_conversations_page)
    },
    []
  )
  // Register the event listener
  useWsEvent<{
    user_id: number
    user_type: string
    user_name: string
    unread_conversations_count: number
    first_conversations_page: Conversation[]
  }>(WS_ON_EVENTS.AUTHENTICATED, handleAuthenticated)

  const handleError = useCallback((data: unknown) => {
    setIsLoading(false)
    setError(JSON.stringify(data))
  }, [])

  useWsEvent(WS_ON_EVENTS.ERROR, handleError)
  // Send authenticate event
  useEffect(() => {
    setIsLoading(true)
    sendEvent(WS_SEND_EVENTS.AUTHENTICATE, {
      token: accessToken,
      first_conversations_page_size: 10,
    })
  }, [accessToken, sendEvent])

  //   refetch the chats list
  const refetch = useCallback(() => {
    setIsLoading(true)
    sendEvent(WS_SEND_EVENTS.AUTHENTICATE, {
      token: accessToken,
      first_conversations_page_size: 10,
    })
  }, [accessToken, sendEvent])

  return {
    data: conversations,
    isLoading,
    error,
    refetch,
  }
}
