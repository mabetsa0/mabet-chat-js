'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getChatList } from '@/services/get-chat-list'
import { useSessionStore } from '@/stores/session-store-provider'
import { parseAsString, useQueryState } from 'nuqs'
import React, { useEffect, useRef } from 'react'

type UseInfiniteChatListParams = {
  showReportedChats: boolean
}

export const useInfiniteChatList = ({
  showReportedChats,
}: UseInfiniteChatListParams) => {
  const [q] = useQueryState('q', parseAsString.withDefault(''))
  const accessToken = useSessionStore((state) => state.accessToken)
  const triggerRef = useRef<React.ComponentRef<'div'>>(null)

  const query = useInfiniteQuery({
    queryKey: ['admin-chats-list', q, showReportedChats],
    queryFn: async ({ pageParam }) => {
      return await getChatList({
        token: accessToken,
        params: {
          page: pageParam,
          q,
          show_reported_chats: showReportedChats,
        },
      })
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: 'always',
    initialPageParam: '',
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPage.data.has_more
        ? lastPage.data.conversations[lastPage.data.conversations.length - 1]
            .id + ''
        : null
    },
  })

  useEffect(() => {
    if (
      query.isFetching ||
      query.isFetchingNextPage ||
      !triggerRef.current ||
      !query.hasNextPage ||
      query.isLoading
    )
      return

    const observer = new IntersectionObserver((entries, observe) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          query.fetchNextPage()
        }
      })
    })

    observer.observe(triggerRef.current!)

    return () => {
      observer.disconnect()
    }
  }, [
    query.isFetching,
    query.isFetchingNextPage,
    query.hasNextPage,
    query.fetchNextPage,
    query.isLoading,
  ])

  return {
    ...query,
    data: query.data?.pages.flatMap((page) => page.data.conversations),
    triggerRef,
  }
}
