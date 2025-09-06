// src/stores/session-store.ts
import { createStore } from 'zustand/vanilla'

export type SessionState = {
  accessToken: string
}

export type SessionActions = {
  setAccessToken: (accessToken: string) => void
}

export type SessionStore = SessionState & SessionActions

export const defaultInitState: SessionState = {
  accessToken: '',
}

export const createSessionStore = (
  initState: SessionState = defaultInitState
) => {
  return createStore<SessionStore>()((set) => ({
    ...initState,
    setAccessToken: (accessToken: string) => set((state) => ({ accessToken })),
  }))
}
