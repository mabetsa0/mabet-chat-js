"use client"

import { User } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import React, { useRef, useState } from "react"

import useClickOutside from "@/hooks/use-click-outside"
import { cn } from "@/lib/utils"
import { Conversation } from "@/@types/chats-response"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSessionStore } from "@/stores/session-store-provider"

const AdminChatItem = ({ conversation }: { conversation: Conversation }) => {
  const { token } = useParams()
  const [chatOptions, setChatOptions] = useState(false)

  const ref = useRef<React.ComponentRef<"div">>(null)
  useClickOutside(ref, () => {
    setChatOptions(false)
  })

  const pathName = usePathname()

  return (
    <div dir="rtl" className="relative" ref={ref}>
      <Link href={`/admin/${token}/chats/${conversation.uuid}`}>
        <div
          className={cn(
            " relative flex   gap-2 border-b border-t bg-white px-4 py-3 duration-200",
            chatOptions && "!translate-x-[5.8rem]",
            pathName.includes(conversation.uuid) && " bg-gray-100"
          )}
        >
          <div className="flex gap-2">
            <div className="relative">
              <Avatar className=" relative aspect-square h-10 w-10">
                <AvatarImage src={conversation.image} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              {conversation.online_participants.length > 0 ? (
                <span className="absolute bottom-0 left-1 block h-4 w-4  rounded-full bg-green-500"></span>
              ) : null}
            </div>
          </div>

          <div>
            <div className="  mb-2 flex gap-1 text-sm">
              <span>{conversation.initiator_name?.trim() || "ضيف"}</span>&
              <span>{conversation.title?.trim()}</span>
            </div>
            <span
              className={cn(
                "block max-w-40 truncate text-sm font-semibold leading-loose text-[#7B7B7B]",
                conversation.unread_messages_count > 0 && "font-bold text-black"
              )}
            >
              {conversation.last_message?.content}
            </span>
          </div>
          <div className=" mr-auto">
            <span className="block text-[10px] leading-loose text-[#494949] ">
              {new Date(
                conversation.last_message?.created_at || conversation.created_at
              ).toLocaleDateString("ar-SA")}
            </span>
            {conversation.unread_messages_count > 0 ? (
              <span className="mt-2 block w-fit rounded bg-green-100 p-1 text-[10px] font-bold text-green-500 ">
                {conversation.unread_messages_count}{" "}
                {conversation.unread_messages_count === 1
                  ? "رسالة جديدة"
                  : "رسائل جديدة"}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default AdminChatItem
