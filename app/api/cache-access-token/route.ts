import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_ISSUED_AT_COOKIE,
  SIX_HOURS_MS,
} from '@/config'
import { getCachedTokenFromCookie } from '@/lib/get-cached-access-token'
import { fetchAccessToken } from '@/services/get-access-token'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { accessToken } = await request.json()
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const cookieStore = await cookies()

  // Save to cookies
  const expiresAt = new Date(Date.now() + SIX_HOURS_MS)

  cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    expires: expiresAt,
    path: '/',
  })

  cookieStore.set(ACCESS_TOKEN_ISSUED_AT_COOKIE, Date.now().toString(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    expires: expiresAt,
    path: '/',
  })

  return NextResponse.json({ token: accessToken }, { status: 200 })
}
