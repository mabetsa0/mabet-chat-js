'use client'

import React, { useState } from 'react'

import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import ChatItem from './chat-item'
import { Loader2 } from 'lucide-react'
import { useInfiniteChatList } from '@/hooks/use-infinite-chat-list'

const ChatList = () => {
  const [showReportedChats, setShowReportedChats] = useState(false)
  const { data, isFetching, triggerRef } = useInfiniteChatList({
    showReportedChats,
  })

  return (
    <>
      <div
        dir="ltr"
        className="flex items-center justify-between gap-2 px-4 py-2"
      >
        <Switch
          id="show_reported_chats"
          checked={showReportedChats}
          onCheckedChange={setShowReportedChats}
        />
        <Label htmlFor="show_reported_chats">عرض المحادثات المبلغ عليها </Label>
      </div>
      <ScrollArea className="bg-stale-50 h-[calc(100vh-120px)]">
        {data?.map((chat, i) => (
          <ChatItem key={`chat_${chat.uuid}`} conversation={chat} />
        ))}
        {isFetching ? (
          <Loader2 className="text-primary mx-auto my-20 size-8 animate-spin" />
        ) : null}
        <div className="h-5" ref={triggerRef}></div>
      </ScrollArea>
    </>
  )
}

export default ChatList
