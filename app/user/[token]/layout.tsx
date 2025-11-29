// import AdminChatView from "@/components/admin-chat-view"
import { getAccessTokenFromHeaders } from '@/lib/get-access-token-from-headers'
import { SessionStoreProvider } from '@/stores/session-store-provider'
import ChatList from './_components/chat-list'

export const dynamic = 'force-dynamic'

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const accessToken = await getAccessTokenFromHeaders()

  if (!accessToken) {
    throw new Error('Access token not found')
  }

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
    </SessionStoreProvider>
  )
}
