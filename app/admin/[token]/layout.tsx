// import AdminChatView from "@/components/admin-chat-view"
import SearchChats from '@/components/common/search-input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getAccessToken } from '@/services/get-access-token'
import { SessionStoreProvider } from '@/stores/session-store-provider'
import ChatList from './_components/chat-list'

export const dynamic = 'force-dynamic'

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
        {/* <div className="  rounded-b-2xl bg-primary p-4  text-white">
          <div className="flex items-center gap-2">
            <Avatar className=" size-14 border-[3px] border-white">
              <AvatarImage src={""} />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div>
              <p className="mb-1 font-bold">{"name"}</p>
              <p className="text-sm font-semibold">
                مرحبا {"name"}, نتمنى لك يوما سعيد .!
              </p>
            </div>
          </div>
        </div> */}
        <div className="flex h-screen gap-2">
          <div className="bg-accent/50 w-full max-w-[350px] border-l">
            <div className="mb-4 px-4">
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
