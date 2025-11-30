import { getChatInfo } from '@/services/get-chat-info'
import { MoreVertical, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import AdminChatBody from "@/components/admin-chat-body"
import BackButton from '@/components/common/back-button'
import { Button } from '@/components/ui/button'
import { getAccessToken } from '@/lib/get-access-token'
import AdminChatBody from './_components/chat-body'
import { ChatProvider } from '@/contexts/chat-context'
export const dynamic = 'force-dynamic'
export default async function Page({
  params,
}: {
  params: Promise<{ uuid: string; token: string }>
}) {
  const { uuid } = await params
  const { token } = await params
  const { token: accessToken, cached } = await getAccessToken(token)

  if (!accessToken) {
    throw new Error('Access token not found')
  }
  const chatData = await getChatInfo({ uuid, token: accessToken })

  return (
    <ChatProvider chatData={chatData}>
      <main>
        <div className="text-primary p-4">
          <div className="flex items-center justify-between gap-4">
            <BackButton />
            <div className="flex grow items-center gap-2">
              <Avatar className="border-primary size-12 border-[3px]">
                <AvatarImage src={chatData.image} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="mb-2">
                  <p className="flex gap-1 text-sm font-semibold">
                    <span>{chatData.initiator_name?.trim() || 'unknown'}</span>&
                    <span>{chatData.title?.trim() || 'unknown'}</span>
                  </p>
                  <span className="text-xs font-medium text-gray-600">
                    {chatData.topic_name || 'unknown'}
                  </span>
                </div>
              </div>
            </div>
            <Button variant={'ghost'} size={'icon'}>
              <MoreVertical />
            </Button>
          </div>
        </div>
        <AdminChatBody />
      </main>
    </ChatProvider>
  )
}
