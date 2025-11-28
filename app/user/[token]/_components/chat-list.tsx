'use client'

import { useCallback, useEffect, useState } from 'react'

import { Conversation } from '@/@types/chats-response'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSendEvent } from '@/hooks/use-send-event'
import { useWsEvent } from '@/hooks/use-ws-event'
import { WS_ON_EVENTS, WS_SEND_EVENTS } from '@/services/ws/events'
import { Loader2 } from 'lucide-react'

const ChatList = ({ accessToken }: { accessToken: string }) => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { sendEvent } = useSendEvent()

  const handleAuthenticated = useCallback((data: Conversation[]) => {
    setIsLoading(false)
    console.log('🚀 ~ useWsEvent ~ data:', data)
    setConversations(data)
  }, [])
  // Register the event listener
  useWsEvent<Conversation[]>(WS_ON_EVENTS.AUTHENTICATED, handleAuthenticated)

  const handleError = useCallback((data: unknown) => {
    console.log('🚀 ~ ChatList ~ error:', data)
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

  return (
    <>
      <ScrollArea className="bg-stale-50 h-[calc(100vh-120px)]">
        {isLoading ? (
          <Loader2 className="text-primary mx-auto my-20 size-8 animate-spin" />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          JSON.stringify(conversations)
        )}
      </ScrollArea>
    </>
  )
}

export default ChatList
