// import AdminChatView from "@/components/admin-chat-view"
import { SessionStoreProvider } from '@/stores/session-store-provider'
import ChatList from './_components/chat-list'
import { getAccessToken } from '@/lib/get-access-token'
import { CacheAccessToken } from '@/components/common/cache-access-token'

export const dynamic = 'force-dynamic'

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{
    token: string
  }>
}) {
  const { token } = await params
  const { token: accessToken, cached } = await getAccessToken(token)

  return (
    <SessionStoreProvider accessToken={accessToken}>
      <main className="h-screen">
        <div className="flex h-screen gap-2">
          <div className="bg-accent/50 w-full max-w-[350px] border-l">
            <ChatList accessToken={accessToken} />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </main>
      <CacheAccessToken cached={cached} token={accessToken} />
    </SessionStoreProvider>
  )
}
