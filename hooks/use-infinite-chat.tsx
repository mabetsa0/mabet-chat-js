"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { getChat } from "@/services/get-chat"
import { useSessionStore } from "@/stores/session-store-provider"
import { useEffect, useRef } from "react"

type UseInfiniteChatParams = {
  uuid: string
}

export const useInfiniteChat = ({ uuid }: UseInfiniteChatParams) => {
  const accessToken = useSessionStore((state) => state.accessToken)
  const triggerRef = useRef<HTMLDivElement>(null)

  const query = useInfiniteQuery({
    queryKey: ["chat-messages", uuid],
    queryFn: async ({ pageParam }) => {
      return await getChat({
        uuid,
        token: accessToken,
        page: pageParam,
        pageSize: 20,
      })
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPage.has_more ? lastPageParam + 1 : null
    },
  })

  // Set up intersection observer for infinite scroll to top
  useEffect(() => {
    if (
      query.isFetching ||
      query.isFetchingNextPage ||
      !triggerRef.current ||
      !query.hasNextPage ||
      query.isLoading
    )
      return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            query.fetchNextPage()
          }
        })
      },
      {
        rootMargin: "100px", // Start loading when trigger is 100px away from viewport
      }
    )

    observer.observe(triggerRef.current)

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

  // Reverse each page's messages and flatten all pages
  // This ensures messages are displayed in chronological order (oldest first, newest last)
  const allMessages =
    query.data?.pages.flatMap((page) => [...page.messages].reverse()) || []

  return {
    ...query,
    messages: allMessages,
    triggerRef,
  }
}
