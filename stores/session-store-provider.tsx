// src/providers/counter-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type SessionStore, createSessionStore } from '@/stores/session-store'

export type SessionStoreApi = ReturnType<typeof createSessionStore>

export const SessionStoreContext = createContext<SessionStoreApi | undefined>(
  undefined
)
export interface SessionStoreProviderProps {
  children: ReactNode
  accessToken: string
}

export const SessionStoreProvider = ({
  children,
  accessToken,
}: SessionStoreProviderProps) => {
  const storeRef = useRef<SessionStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createSessionStore({ accessToken })
  }

  return (
    <SessionStoreContext.Provider value={storeRef.current}>
      {children}
    </SessionStoreContext.Provider>
  )
}

export const useSessionStore = <T,>(
  selector: (store: SessionStore) => T
): T => {
  const sessionStoreContext = useContext(SessionStoreContext)

  if (!sessionStoreContext) {
    throw new Error(`useSessionStore must be used within SessionStoreProvider`)
  }

  return useStore(sessionStoreContext, selector)
}
