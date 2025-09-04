// import AdminChatView from "@/components/admin-chat-view"
import SearchChats from "@/components/common/search-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAccessToken } from "@/services/get-access-token"
import { SessionStoreProvider } from "@/stores/session-store-provider"
import ChatList from "./_components/chat-list"

export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{
    token: string
  }>
}) {
  const { token } = await params
  const accessToken = await getAccessToken(token)

  return (
    <SessionStoreProvider accessToken={accessToken}>
      <main className="h-screen">
        <div className="  rounded-b-2xl bg-primary p-6  text-white">
          <div className="flex items-center gap-2">
            <Avatar className=" h-16 w-16 border-[3px] border-white">
              <AvatarImage src={""} />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div>
              <p className="mb-2 font-bold">{"name"}</p>
              <p className="text-sm font-semibold">
                مرحبا {"name"}, نتمنى لك يوما سعيد .!
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-8 h-[calc(100vh-115px)]">
          <div className="w-full max-w-md bg-accent/80 px-4 border-l ">
            <div className="mb-4">
              <SearchChats />
            </div>
            <ChatList />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </main>
    </SessionStoreProvider>
  )
}
