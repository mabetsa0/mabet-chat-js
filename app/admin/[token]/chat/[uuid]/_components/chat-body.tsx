"use client"

import { useInfiniteChat } from "@/hooks/use-infinite-chat"
import React, { useEffect, useRef } from "react"

import ChatInput from "@/components/common/chat-input"
import DateIndicator from "@/components/common/date-indicator"
import Message from "@/components/common/message"
import { ScrollArea } from "@/components/ui/scroll-area"
import dayjs from "dayjs"
import { Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import { useChatData } from "@/contexts/chat-context"
import UnitCard from "@/components/common/unit-card"
// import UnitCard from "@/components/common/unit-card"

const AdminChatBody = () => {
  const chatData = useChatData()

  const { uuid } = useParams<{ uuid: string }>()!
  const { messages, isLoading, isFetchingNextPage, hasNextPage, triggerRef } =
    useInfiniteChat({ uuid })

  const lastMessageRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "instant" })
    }
  }, [isLoading])

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  return (
    <div className="h-[calc(100vh-100px)] relative">
      <ScrollArea className={"relative h-full pb-21 "}>
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
            name: "test",
            code: "test",
            address: "test",
            image: "test",
            link: "test",
          }}
        />
        {messages.map((message, index) => {
          return (
            <React.Fragment key={`message_${message.id}`}>
              {dayjs(message.created_at).format("DD/MM/YYYY") !==
              dayjs(messages[index - 1]?.created_at).format("DD/MM/YYYY") ? (
                <DateIndicator date={message.created_at} />
              ) : null}
              <div ref={index === messages.length - 1 ? lastMessageRef : null}>
                <Message {...message} />
              </div>
            </React.Fragment>
          )
        })}
      </ScrollArea>
      <ChatInput />
    </div>
  )
}

export default AdminChatBody
