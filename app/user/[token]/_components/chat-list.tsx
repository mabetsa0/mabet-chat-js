'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useWsChatsList } from '@/hooks/use-ws-chats-list'
import { Loader2, MessageSquare, RefreshCcw } from 'lucide-react'
import ChatItem from './chat-item'
import { Button } from '@/components/ui/button'

const ChatList = ({ accessToken }: { accessToken: string }) => {
  const { data, isLoading, error, refetch } = useWsChatsList(accessToken)

  return (
    <div className="h-screen">
      <div className="px-4 py-2">
        <p className="font-bold">محادثاتي</p>
      </div>
      <ScrollArea className="bg-stale-50 h-[calc(100vh-40px)]">
        {isLoading ? (
          <div className="flex h-[calc(100vh-40px)] items-center justify-center">
            <Loader2 className="text-primary mx-auto my-20 size-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex h-[calc(100vh-40px)] flex-col items-center justify-center gap-2 text-red-500">
            {error}
            <Button onClick={refetch}>
              <RefreshCcw className="size-4" />
              <span>اعادة التحميل</span>
            </Button>
          </div>
        ) : data && data.length > 0 ? (
          data.map((conversation) => (
            <ChatItem key={conversation.uuid} conversation={conversation} />
          ))
        ) : (
          <div className="flex h-[calc(100vh-40px)] flex-col items-center justify-center gap-4 text-center">
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
    </div>
  )
}

export default ChatList
