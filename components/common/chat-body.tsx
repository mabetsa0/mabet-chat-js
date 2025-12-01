'use client'

import { useInfiniteChat } from '@/hooks/use-infinite-chat'
import React, { useEffect, useRef } from 'react'

import ChatInput from '@/components/common/chat-input'
import DateIndicator from '@/components/common/date-indicator'
import Message from '@/components/common/message'
import UnitCard from '@/components/common/unit-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useChatData } from '@/contexts/chat-context'
import { useUser } from '@/contexts/user-context'
import dayjs from 'dayjs'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
// import UnitCard from "@/components/common/unit-card"

const ChatBody = () => {
  const chatData = useChatData()
  const { uuid } = useParams<{ uuid: string }>()!
  const [user] = useUser()
  const { messages, isLoading, isFetchingNextPage, hasNextPage, triggerRef } =
    useInfiniteChat({ uuid })

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const hasScrolledToBottomRef = useRef(false)
  const lastMessageIdRef = useRef<string | null>(null)

  // Scroll to bottom function
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    // Try to find the ScrollArea viewport
    const viewport = scrollAreaRef.current?.querySelector(
      '[data-slot="scroll-area-viewport"]'
    ) as HTMLElement

    if (viewport) {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior,
      })
    } else if (lastMessageRef.current) {
      // Fallback to scrollIntoView
      lastMessageRef.current.scrollIntoView({ behavior })
    }
  }

  // Scroll to bottom on initial load
  useEffect(() => {
    if (!isLoading && messages.length > 0 && !hasScrolledToBottomRef.current) {
      // Use instant scroll for initial load
      scrollToBottom('instant')
      hasScrolledToBottomRef.current = true
      lastMessageIdRef.current = messages[messages.length - 1]?.id || null
    }
  }, [isLoading])

  // Scroll to bottom when new messages are added at the end (after sending)
  useEffect(() => {
    if (!hasScrolledToBottomRef.current || messages.length === 0) return

    const lastMessage = messages[messages.length - 1]
    const currentLastMessageId = lastMessage?.id

    // Only scroll if the last message ID changed (new message added at the end)
    if (
      currentLastMessageId &&
      currentLastMessageId !== lastMessageIdRef.current
    ) {
      lastMessageIdRef.current = currentLastMessageId
      // Use smooth scroll for new messages
      scrollToBottom('smooth')
    }
  }, [messages])

  if (isLoading || !user?.id)
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <Loader2 className="text-primary size-8 animate-spin" />
      </div>
    )
  return (
    <div className="relative h-[calc(100vh-100px)]">
      <div ref={scrollAreaRef} className="h-full">
        <ScrollArea className={'relative h-full pb-21'}>
          {/* Infinite scroll trigger at the top */}
          {hasNextPage && (
            <div ref={triggerRef} className="flex justify-center py-4">
              {isFetchingNextPage ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <div className="h-4" />
              )}
            </div>
          )}

          {/* {message !== state[index - 1]?.unit_id ? (
  data?.data.unit?.[message.unit_id] ? (
  ) : null
) : null} */}

          <UnitCard
            unit={{
              id: chatData.topic_id + '',
              name: chatData.topic_name || 'unknown',
              image: chatData.image,
            }}
          />
          {messages.map((message, index) => {
            return (
              <React.Fragment key={`message_${message.id}`}>
                {index === 0 ||
                dayjs(message.created_at).format('DD/MM/YYYY') !==
                  dayjs(messages[index - 1]?.created_at).format(
                    'DD/MM/YYYY'
                  ) ? (
                  <DateIndicator date={message.created_at} />
                ) : null}
                <div
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                >
                  <Message {...message} />
                </div>
              </React.Fragment>
            )
          })}
        </ScrollArea>
      </div>
      <ChatInput />
    </div>
  )
}

export default ChatBody
