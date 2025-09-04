"use client"

import { getChat } from "@/services/get-chat"
import { useQuery } from "@tanstack/react-query"
import React, { useRef } from "react"

import Message from "@/components/common/message"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"
import ChatInput from "@/components/common/chat-input"
import DateIndicator from "@/components/common/date-indicator"
import { useParams } from "next/navigation"
import { useSessionStore } from "@/stores/session-store-provider"
// import UnitCard from "@/components/common/unit-card"

const AdminChatBody = () => {
  const { uuid } = useParams<{ uuid: string }>()!
  const accessToken = useSessionStore((state) => state.accessToken)
  const { data, isFetching, isFetched, isLoading } = useQuery({
    queryKey: [uuid],
    queryFn: async () => await getChat({ uuid, token: accessToken }),
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
  })

  const lastMessageRef = useRef<HTMLDivElement>(null)

  if (isLoading) return <Loader2 />
  return (
    <>
      <ScrollArea className={"relative h-[calc(100vh-310px)] pt-5"}>
        {data?.messages.map((message, index) => {
          return (
            <React.Fragment key={`message_${message.id}`}>
              {/* {message !== state[index - 1]?.unit_id ? (
                data?.data.unit?.[message.unit_id] ? (
                  <UnitCard unit={data!.data.unit?.[message.unit_id]} />
                ) : null
              ) : null} */}

              {message.created_at !== data.messages[index - 1]?.created_at ? (
                <DateIndicator date={message.created_at} />
              ) : null}
              <div
                ref={index === data.messages.length - 1 ? lastMessageRef : null}
              >
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
