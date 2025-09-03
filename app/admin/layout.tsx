// import AdminChatView from "@/components/admin-chat-view"
import SearchChats from "@/components/common/search-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    token: string
  }
}) {
  return (
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
        <div className="w-full max-w-md bg-accent/80 px-2 border-l ">
          <div className="mb-4">
            <SearchChats />
          </div>
          {/* <AdminChatView token={params.token} /> */}
          <div>AdminChatView</div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </main>
  )
}
