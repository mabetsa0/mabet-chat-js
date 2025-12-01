import { getChatInfo } from '@/services/get-chat-info'
import { User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import AdminChatBody from "@/components/admin-chat-body"
import BackButton from '@/components/common/back-button'
import ChatBody from '@/components/common/chat-body'
import { ChatProvider } from '@/contexts/chat-context'
import { getAccessToken } from '@/lib/get-access-token'
export const dynamic = 'force-dynamic'
export default async function Page({
  params,
}: {
  params: Promise<{ uuid: string; token: string }>
}) {
  const { token, uuid } = await params

  const { token: accessToken } = await getAccessToken(token)

  if (!accessToken) {
    throw new Error('Access token not found')
  }
  try {
    const chatData = await getChatInfo({
      uuid,
      token: accessToken,
    })

    return (
      <ChatProvider chatData={chatData}>
        <main>
          <div className="bg- p-4">
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
                      <span>{chatData.title?.trim() || 'unknown'}</span>
                    </p>
                  </div>
                </div>
              </div>
              {/* <Button variant={'ghost'} size={'icon'}>
                <MoreVertical />
              </Button> */}
            </div>
          </div>
          <ChatBody />
        </main>
      </ChatProvider>
    )
  } catch (error) {
    console.error(error)
    return <div>{JSON.stringify(error)}</div>
  }
}
