"use client"

import React, { useState } from "react"

import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import AdminChatItem from "./chat-item"
import { Loader2 } from "lucide-react"
import { useInfiniteChatList } from "@/hooks/use-infinite-chat-list"

const ChatList = () => {
  const [showReportedChats, setShowReportedChats] = useState(false)
  const { data, isFetching, isLoading, triggerRef } = useInfiniteChatList({
    showReportedChats,
  })

  return (
    <>
      <div
        dir="ltr"
        className="flex items-center justify-between gap-2  px-4 py-2 "
      >
        <Switch
          id="show_reported_chats"
          checked={showReportedChats}
          onCheckedChange={setShowReportedChats}
        />
        <Label htmlFor="show_reported_chats">عرض المحادثات المبلغ عليها </Label>
      </div>
      <ScrollArea className="bg-stale-50 h-[calc(100vh-200px)]">
        {data?.map((chat, i) => (
          <AdminChatItem key={`chat_${chat.uuid}`} conversation={chat} />
        ))}
        {isFetching ? (
          <Loader2 className="animate-spin size-8 mx-auto my-20" />
        ) : null}
        <div className="h-5 " ref={triggerRef}></div>
      </ScrollArea>
    </>
  )
}

export default ChatList
