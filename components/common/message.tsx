import { Copy, Loader2, ShieldAlert, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Message as MessageType } from '@/@types/chat-response'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { cn, formateMessageDate } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useChatData } from '@/contexts/chat-context'

const Message = ({
  id,
  sender_id,
  sender_type,
  sender_name,
  conversation_uuid,
  content,
  created_at,
  errorMessage,
  isLoading,
  className,
}: MessageType & {
  errorMessage?: string
  isLoading?: boolean
  className?: string
}) => {
  const chatData = useChatData()
  const handleCopy = async () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log('Text copied successfully!')
      })
      .catch((error) => {
        console.error('Failed to copy text:', error)
      })
  }
  const handleDeleteMessage = async () => {
    // await deleteMessage(id)
  }
  const pathName = usePathname()
  const isAdminView = pathName?.includes('/admin')

  const isInitiator = chatData.initiator_id === sender_id

  return (
    <>
      <div dir="rtl" className={cn('my-2 flex px-5 select-none', className)}>
        <ContextMenu>
          <ContextMenuTrigger className="mr-auto">
            <div
              className={cn(
                'text-foreground rounded-tr-xl rounded-b-xl bg-[#ebecee] px-3 py-2',
                isInitiator && 'bg-[#3a81f5] text-white',
                errorMessage && 'border-red-600 bg-red-500 text-white',
                sender_type === 'admin' && 'border-primary border'
              )}
            >
              <div
                className={cn(
                  'flex max-w-sm items-center gap-4 text-sm',
                  sender_type === 'admin' &&
                    'text-primary text-[16px] font-bold'
                )}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarFallback>
                      <User className="text-foreground size-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-bold">{sender_name}</span>
                </div>
                <span className="text-[11px]">
                  {formateMessageDate(created_at)}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                {errorMessage ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#db3939"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-triangle-alert"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                ) : null}
                <p
                  className={cn(
                    'text-foreground',
                    sender_type === 'admin' && 'text-secondaryColor font-bold',
                    isInitiator && 'text-white'
                  )}
                >
                  {content}
                </p>
              </div>
              <span className="text-[10px] text-red-500">{errorMessage}</span>
            </div>
          </ContextMenuTrigger>
          {/* <ContextMenuTrigger>Right click</ContextMenuTrigger> */}
          <ContextMenuContent>
            <ContextMenuItem
              onClick={handleCopy}
              className="flex-end justify-end gap-1"
            >
              <span>نسخ</span>
              <Copy className="mr-2 h-4 w-4" />
            </ContextMenuItem>
            <ContextMenuItem
              onClick={handleDeleteMessage}
              className="flex-end justify-end gap-1 text-red-500 hover:!text-red-600"
            >
              <span>حذف الرسالة</span>
              <ShieldAlert className="mr-2 h-4 w-4" />
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </>
  )
}

export default Message
