import { Copy, Loader2, ShieldAlert, User, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Message as MessageType } from '@/@types/chat-response'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { cn, formateMessageDate } from '@/lib/utils'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useChatData } from '@/contexts/chat-context'
import { useDeleteMessage } from '@/hooks/use-delete-message'
import { useUser } from '@/contexts/user-context'

type MessageProps = MessageType & {
  errorMessage?: string
  isLoading?: boolean
  className?: string
}

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
}: MessageProps) => {
  const chatData = useChatData()
  const [user] = useUser()
  const pathName = usePathname()
  const { mutate: deleteMessage, isPending } = useDeleteMessage()

  // Determine message type
  const isAdminView = pathName?.includes('/admin')
  const isAdminMessage = sender_type === 'admin'
  const isUserMessage = !isAdminView && user?.id === sender_id.toString()
  const isOtherMessage = !isUserMessage && !isAdminMessage

  // Determine alignment based on message type
  const getAlignment = () => {
    if (isAdminMessage) return 'justify-center'
    if (isUserMessage) return 'justify-start'
    return 'justify-end'
  }

  // Get message style classes based on type
  const getMessageStyles = () => {
    const baseStyles = 'rounded-xl px-3 py-2 transition-colors'

    if (errorMessage) {
      return cn(baseStyles, 'bg-red-500 text-white border-2 border-red-600')
    }

    if (isAdminMessage) {
      return cn(
        baseStyles,
        'text-primary border-2 border-primary',
        'rounded-tl-xl rounded-tr-xl rounded-br-xl rounded-bl-xl'
      )
    }

    if (isUserMessage) {
      return cn(
        baseStyles,
        'bg-blue-500 text-primary',
        'rounded-tl-xl rounded-tr-none rounded-br-xl rounded-bl-xl'
      )
    }
    // Other message (other side)
    return cn(
      baseStyles,
      'bg-gray-200 text-foreground',
      'rounded-tr-xl rounded-tl-none rounded-bl-xl rounded-br-xl'
    )
  }

  // Get header styles based on message type
  const getHeaderStyles = () => {
    if (isAdminMessage) {
      return 'text-primary text-base font-bold'
    }
    if (isUserMessage) {
      return 'text-primary-foreground text-sm font-semibold'
    }
    return 'text-foreground text-sm font-medium'
  }

  // Get content styles based on message type
  const getContentStyles = () => {
    if (errorMessage) {
      return 'text-white'
    }
    if (isAdminMessage) {
      return 'text-primary font-semibold'
    }
    if (isUserMessage) {
      return 'text-primary-foreground'
    }
    return 'text-foreground'
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      console.log('Text copied successfully!')
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const handleDeleteMessage = () => {
    deleteMessage({ id })
  }

  const alignment = getAlignment()

  return (
    <div
      dir="rtl"
      className={cn('my-2 flex px-5 select-none', alignment, className)}
    >
      <ContextMenu>
        <ContextMenuTrigger className="max-w-[80%] lg:max-w-[70%]">
          <div className={getMessageStyles()}>
            {/* Message Header */}
            <div
              className={cn(
                'flex max-w-sm items-center gap-4',
                getHeaderStyles()
              )}
            >
              <div className="flex items-center gap-2">
                <Avatar
                  className={cn(
                    'size-8',
                    isAdminMessage && 'ring-primary ring-2',
                    isUserMessage && 'ring-primary-foreground/20 ring-2'
                  )}
                >
                  <AvatarFallback>
                    {isAdminMessage ? (
                      <Shield className="text-primary size-4" />
                    ) : (
                      <User className="size-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <span>{sender_name}</span>
              </div>
              <span
                className={cn(
                  'text-[11px]',
                  isAdminMessage && 'text-primary/70',
                  isUserMessage && 'text-primary-foreground/70',
                  isOtherMessage && 'text-muted-foreground'
                )}
              >
                {formateMessageDate(created_at)}
              </span>
            </div>

            {/* Message Content */}
            <div className="mt-2 flex items-center gap-1">
              {isLoading || isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              {errorMessage ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
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
              <p className={getContentStyles()}>{content}</p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <span className="mt-1 block text-[10px] text-red-200">
                {errorMessage}
              </span>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={handleCopy}
            className="flex-end justify-end gap-1"
          >
            <span>نسخ</span>
            <Copy className="mr-2 h-4 w-4" />
          </ContextMenuItem>
          {isUserMessage && (
            <ContextMenuItem
              onClick={handleDeleteMessage}
              className="flex-end justify-end gap-1 text-red-500 hover:!text-red-600"
            >
              <span>حذف الرسالة</span>
              <ShieldAlert className="mr-2 h-4 w-4 text-red-500" />
            </ContextMenuItem>
          )}
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}

export default Message
