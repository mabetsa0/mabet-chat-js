"use client"

import React, { useRef, useEffect } from "react"
import { useInfiniteChat } from "@/hooks/use-infinite-chat"

import Message from "@/components/common/message"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"
import ChatInput from "@/components/common/chat-input"
import DateIndicator from "@/components/common/date-indicator"
import { useParams } from "next/navigation"
import dayjs from "dayjs"
// import UnitCard from "@/components/common/unit-card"

const AdminChatBody = () => {
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
      <div className="flex justify-center items-center h-[calc(100vh-270px)]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  return (
    <>
      <ScrollArea className={"relative h-[calc(100vh-270px)] pt-5"}>
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

        {messages.map((message, index) => {
          return (
            <React.Fragment key={`message_${message.id}`}>
              {/* {message !== state[index - 1]?.unit_id ? (
                data?.data.unit?.[message.unit_id] ? (
                  <UnitCard unit={data!.data.unit?.[message.unit_id]} />
                ) : null
              ) : null} */}

              {dayjs(message.created_at).format("DD/MM/YYYY") !==
              dayjs(messages[index - 1]?.created_at).format("DD/MM/YYYY") ? (
                <DateIndicator date={message.created_at} />
              ) : null}
              <div ref={index === messages.length - 1 ? lastMessageRef : null}>
                <Message
                  {...message}
                  is_me={message.sender_id === 1}
                  isLoading={false}
                  errorMessage={undefined}
                />
              </div>
            </React.Fragment>
          )
        })}
      </ScrollArea>
      <ChatInput />
    </>
  )
}

export default AdminChatBody
