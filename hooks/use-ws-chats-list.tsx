'use client'

import { useCallback, useEffect, useState } from 'react'

import { Conversation } from '@/@types/chats-response'
import { useSendEvent } from '@/hooks/use-send-event'
import { useWsEvent } from '@/hooks/use-ws-event'
import { WS_ON_EVENTS, WS_SEND_EVENTS } from '@/services/ws/events'
import { useRef } from 'react'
type AuthenticatedEventPayload = {
  user_id: number
  user_type: string
  user_name: string
  unread_conversations_count: number
  first_conversations_page: Conversation[]
}
export const useWsChatsList = (accessToken: string) => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { sendEvent } = useSendEvent()
  const lastAuthenticateEventIdRef = useRef<string | null>(null)

  const handleAuthenticated = useCallback((data: AuthenticatedEventPayload) => {
    setIsLoading(false)
    setConversations(data.first_conversations_page)
  }, [])
  // Register the event listener
  useWsEvent<AuthenticatedEventPayload>(
    WS_ON_EVENTS.AUTHENTICATED,
    handleAuthenticated
  )

  const handleError = useCallback(
    (data: { code: string; message: string }, id: string) => {
      // Only handle errors related to the latest AUTHENTICATE event we sent
      if (id !== lastAuthenticateEventIdRef.current) return

      setIsLoading(false)
      setError(data.message)
    },
    []
  )

  useWsEvent(WS_ON_EVENTS.ERROR, handleError)
  // Send authenticate event
  useEffect(() => {
    setIsLoading(true)
    lastAuthenticateEventIdRef.current = sendEvent(
      WS_SEND_EVENTS.AUTHENTICATE,
      {
        token: accessToken + '23',
        first_conversations_page_size: 10,
      }
    )!
  }, [accessToken, sendEvent])

  //   refetch the chats list
  const refetch = useCallback(() => {
    setIsLoading(true)
    lastAuthenticateEventIdRef.current = sendEvent(
      WS_SEND_EVENTS.AUTHENTICATE,
      {
        token: accessToken,
        first_conversations_page_size: 10,
      }
    )!
  }, [accessToken, sendEvent])

  return {
    data: conversations,
    isLoading,
    error,
    refetch,
  }
}
