'use client'

import { User } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import { Conversation } from '@/@types/chats-response'
import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import dayjs from 'dayjs'

const ChatItem = ({ conversation }: { conversation: Conversation }) => {
  const { token } = useParams()

  const pathName = usePathname()

  return (
    <div dir="rtl" className="relative">
      <Link href={`/user/${token}/chat/${conversation.uuid}`}>
        <div
          className={cn(
            'relative flex gap-2 border-t border-b bg-white px-4 py-2.5 duration-100 hover:bg-gray-200',
            pathName.includes(conversation.uuid) && 'bg-gray-200'
          )}
        >
          <div className="flex gap-2">
            <div className="relative">
              <Avatar className="relative aspect-square h-10 w-10">
                <AvatarImage src={conversation.image} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              {conversation.online_participants.length > 0 ? (
                <span className="absolute bottom-0 left-1 block h-4 w-4 rounded-full bg-green-500"></span>
              ) : null}
            </div>
          </div>

          <div>
            <div className="mb-2">
              <p className="flex gap-1 text-sm font-semibold">
                <span>{conversation.initiator_name?.trim() || 'unknown'}</span>&
                <span>{conversation.title?.trim() || 'unknown'}</span>
              </p>
              <span className="text-xs font-medium text-gray-600">
                {conversation.topic_name || 'unknown'}
              </span>
            </div>
            <span
              className={cn(
                'block max-w-40 truncate text-sm leading-loose font-semibold text-[#7B7B7B]',
                conversation.unread_messages_count > 0 && 'font-bold text-black'
              )}
            >
              {conversation.last_message?.content}
            </span>
          </div>
          <div className="mr-auto">
            <span className="block text-[10px] leading-loose text-[#494949]">
              {dayjs(
                conversation.last_message?.created_at || conversation.created_at
              ).format('DD MMM YYYY')}
            </span>
            {conversation.unread_messages_count > 0 ? (
              <span className="mt-2 block w-fit rounded bg-green-100 p-1 text-[10px] font-bold text-green-500">
                {conversation.unread_messages_count}{' '}
                {conversation.unread_messages_count === 1
                  ? 'رسالة جديدة'
                  : 'رسائل جديدة'}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ChatItem
