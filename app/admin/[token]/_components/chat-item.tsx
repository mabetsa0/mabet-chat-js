"use client"

import { User } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import React, { useRef, useState } from "react"

import useClickOutside from "@/hooks/use-click-outside"
import { cn } from "@/lib/utils"
import { Chat } from "@/services/get-chat-list"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSessionStore } from "@/stores/session-store-provider"

const AdminChatItem = ({
  uuid,
  sender_name,
  receiver_name,
  is_sender_online,
  last_sender_active,
  is_receiver_online,
  last_receiver_active,
  sender_identifier,
  receiver_identifier,
  sender_guard,
  receiver_guard,
  sender_image,
  receiver_image,
  last_message,
  is_read,
  unread_messages,
  created_at,
  last_message_at,
  last_message_day,
  chat_link,
  access_token,
}: Chat) => {
  const accessToken = useSessionStore((state) => state.accessToken)
  const { token } = useParams()
  const [chatOptions, setChatOptions] = useState(false)

  const ref = useRef<React.ComponentRef<"div">>(null)
  useClickOutside(ref, () => {
    setChatOptions(false)
  })

  const pathName = usePathname()

  return (
    <div dir="rtl" className="relative" ref={ref}>
      <Link href={`/admin/${token}/chats/${uuid}?token=${token}`}>
        <div
          className={cn(
            " relative flex   gap-2 border-b border-t bg-white px-4 py-3 duration-200",
            chatOptions && "!translate-x-[5.8rem]",
            pathName.includes(uuid) && " bg-gray-100"
          )}
        >
          <div className="flex gap-2">
            <div className="relative">
              <Avatar className=" relative aspect-square h-10 w-10">
                <AvatarImage src={receiver_image} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              {is_receiver_online ? (
                <span className="absolute bottom-0 left-1 block h-4 w-4  rounded-full bg-green-500"></span>
              ) : null}
            </div>
          </div>

          <div>
            <div className="  mb-2 flex gap-1 text-sm">
              <span>{sender_name?.trim() || "ضيف"}</span>&
              <span>{receiver_name?.trim()}</span>
            </div>
            <span
              className={cn(
                "block max-w-40 truncate text-sm font-semibold leading-loose text-[#7B7B7B]",
                !is_read && "font-bold text-black"
              )}
            >
              {/* {isTyping ? (
                <span className="font-bold text-primary">يكتب...</span>
              ) : ( */}
              {last_message}
              {/* )} */}
            </span>
          </div>
          <div className=" mr-auto">
            <span className="block text-[10px] leading-loose text-[#494949] ">
              {last_message_day}
            </span>
            {!!unread_messages ? (
              <span className="mt-2 block w-fit rounded bg-green-100 p-1 text-[10px] font-bold text-green-500 ">
                {unread_messages}{" "}
                {unread_messages === 1 ? "رسالة جديدة" : "رسائل جديدة"}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default AdminChatItem
