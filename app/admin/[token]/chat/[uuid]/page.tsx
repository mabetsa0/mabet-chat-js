import { getChat } from "@/services/get-chat"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { MoreVertical, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import AdminChatBody from "@/components/admin-chat-body"
import { queryClient } from "@/app/providers"
import BackButton from "@/components/common/back-button"
import { Button } from "@/components/ui/button"
export const dynamic = "force-dynamic"
export default async function Page({
  params,
}: {
  params: Promise<{ chatID: string; token: string }>
}) {
  const { chatID, token: tokenParam } = await params
  const token = decodeURIComponent(tokenParam)
  const chatData = await getChat({ chatID, token })

  await queryClient.prefetchQuery({
    queryKey: [chatID],
    queryFn: async () => await getChat({ chatID, token }),
  })
  return (
    <main>
      <div className="space-y-6 rounded-b-2xl  p-6  text-primary">
        <div className="flex items-center justify-between gap-4 ">
          <BackButton />
          <div className="flex grow items-center gap-2">
            <Avatar className="h-[60px] w-[60px] border-[3px] border-primary">
              <AvatarImage src={chatData.data.user[0].avatar} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="mb-2 font-bold">{chatData.data.user[0].name}</p>
              {/* <UserState chatID={chatID} token={token} /> */}
            </div>
          </div>
          <Button variant={"ghost"} size={"icon"}>
            <MoreVertical />
          </Button>
        </div>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <AdminChatBody chatID={chatID} token={token} /> */}
      </HydrationBoundary>
    </main>
  )
}
