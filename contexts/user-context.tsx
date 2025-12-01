'use client'

import React, { createContext, useContext, ReactNode, useState } from 'react'

type UserType = 'admin' | 'user' | 'guest'

export interface UserContextValue {
  id: string
  name: string
  type: UserType
}

const UserContext = createContext<
  [
    UserContextValue | null,
    React.Dispatch<React.SetStateAction<UserContextValue | null>>,
  ]
>([null, () => {}])

interface UserProviderProps {
  children: ReactNode
  user: UserContextValue | null
}

export const UserProvider = ({ children, user }: UserProviderProps) => {
  const state = useState<UserContextValue | null>(user || null)

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
