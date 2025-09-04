import { getChatInfo } from "@/services/get-chat-info"
import { MoreVertical, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import AdminChatBody from "@/components/admin-chat-body"
import BackButton from "@/components/common/back-button"
import { Button } from "@/components/ui/button"
import { getAccessToken } from "@/services/get-access-token"
import AdminChatBody from "./_components/chat-body"
export const dynamic = "force-dynamic"
export default async function Page({
  params,
}: {
  params: Promise<{ chatID: string; token: string }>
}) {
  const { chatID, token: tokenParam } = await params
  const token = decodeURIComponent(tokenParam)
  const accessToken = await getAccessToken(token)
  const chatData = await getChatInfo({ chatID, token: accessToken })

  return (
    <main>
      <div className="space-y-6 rounded-b-2xl  p-6  text-primary">
        <div className="flex items-center justify-between gap-4 ">
          <BackButton />
          <div className="flex grow items-center gap-2">
            <Avatar className="h-[60px] w-[60px] border-[3px] border-primary">
              <AvatarImage src={chatData.image} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="  mb-2">
                <p className="flex gap-1 text-sm font-semibold">
                  <span>{chatData.initiator_name?.trim() || "unknown"}</span>&
                  <span>{chatData.title?.trim() || "unknown"}</span>
                </p>
                <span className="text-xs font-medium text-gray-600">
                  {chatData.topic_name || "unknown"}
                </span>
              </div>
            </div>
          </div>
          <Button variant={"ghost"} size={"icon"}>
            <MoreVertical />
          </Button>
        </div>
      </div>
      <AdminChatBody />
    </main>
  )
}
