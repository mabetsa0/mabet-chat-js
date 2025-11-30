import { cookies } from 'next/headers'
import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_ISSUED_AT_COOKIE,
  SIX_HOURS_MS,
} from '@/config'

export const getCachedTokenFromCookie = async () => {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get(ACCESS_TOKEN_COOKIE)
  const issuedAtCookie = cookieStore.get(ACCESS_TOKEN_ISSUED_AT_COOKIE)

  if (!tokenCookie || !issuedAtCookie) return null

  const issuedAt = Number(issuedAtCookie.value)
  if (Number.isNaN(issuedAt)) return null

  const isExpired = Date.now() - issuedAt > SIX_HOURS_MS

  return isExpired ? null : tokenCookie.value
}
