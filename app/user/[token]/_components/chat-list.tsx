'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useWsChatsList } from '@/hooks/use-ws-chats-list'
import { Loader2, MessageSquare } from 'lucide-react'
import ChatItem from './chat-item'

const ChatList = ({ accessToken }: { accessToken: string }) => {
  const { data, isLoading, error, refetch } = useWsChatsList(accessToken)

  return (
    <>
      <ScrollArea className="bg-stale-50 h-screen">
        {isLoading ? (
          <div className="flex h-screen items-center justify-center">
            <Loader2 className="text-primary mx-auto my-20 size-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : data && data.length > 0 ? (
          data.map((conversation) => (
            <ChatItem key={conversation.uuid} conversation={conversation} />
          ))
        ) : (
          <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
            <MessageSquare className="text-muted-foreground size-12" />
            <div className="space-y-2">
              <p className="text-muted-foreground text-lg font-medium">
                لا توجد محادثات
              </p>
              <p className="text-muted-foreground text-sm">
                لم يتم العثور على أي محادثات حتى الآن
              </p>
            </div>
          </div>
        )}
      </ScrollArea>
    </>
  )
}

export default ChatList
