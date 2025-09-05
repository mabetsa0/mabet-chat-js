import { Copy, Loader2, ShieldAlert, User } from "lucide-react"
import { usePathname } from "next/navigation"

import { Message as Props } from "@/@types/chat-response"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

const Message = ({
  id,
  sender_id,
  sender_type,
  sender_name,
  conversation_uuid,
  content,
  created_at,
  errorMessage,
  is_me,
  isLoading,
  className,
}: Props & {
  errorMessage?: string
  is_me?: boolean
  isLoading?: boolean
  className?: string
}) => {
  const handleCopy = async () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log("Text copied successfully!")
      })
      .catch((error) => {
        console.error("Failed to copy text:", error)
      })
  }
  const handleDeleteMessage = async () => {
    // await deleteMessage(id)
  }
  const pathName = usePathname()
  const isAdminView = pathName?.includes("/admin")

  return (
    <>
      <div
        dir="rtl"
        className={cn(
          "my-2 flex select-none  px-5 ",
          sender_type === "admin" && "my-4 shadow-md",
          className
        )}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className={cn(
                "rounded-md border border-lightGray px-[10px] py-[6px]",
                errorMessage && "border-red-600 ",
                sender_type === "admin" && "border-primary "
              )}
            >
              <div
                className={cn(
                  "flex  items-center gap-2 text-sm",
                  !is_me && !isAdminView ? " text-primary" : "text-gray-900",
                  sender_type === "admin" &&
                    "text-[16px] font-bold text-primary"
                )}
              >
                <Avatar className=" h-8 w-8 border-[3px] border-white">
                  <AvatarImage
                    src={sender_type === "admin" ? "" : is_me ? "" : ""}
                  />
                  <AvatarFallback>
                    <User className=" h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="font-bold">
                  {sender_type === "admin"
                    ? "مسؤول"
                    : is_me
                    ? "أنت"
                    : sender_name}
                </span>
                <span className="text-[11px]">
                  {dayjs(created_at).fromNow()}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                {isLoading ? (
                  <Loader2 className="h-4 w-4  animate-spin" />
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
                    " text-[#7B7B7B]",
                    sender_type === "admin" && "font-bold  text-secondaryColor"
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
              className="flex-end  justify-end gap-1"
            >
              <span>نسخ</span>
              <Copy className="mr-2 h-4 w-4 " />
            </ContextMenuItem>
            <ContextMenuItem
              onClick={handleDeleteMessage}
              className="flex-end justify-end gap-1  text-red-500 hover:!text-red-600"
            >
              <span>حذف الرسالة</span>
              <ShieldAlert className="mr-2 h-4 w-4 " />
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </>
  )
}

export default Message
