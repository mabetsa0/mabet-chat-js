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
  const { token } = await request.json()
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let accessToken = await getCachedTokenFromCookie()

  if (accessToken) {
    return NextResponse.json({ token: accessToken }, { status: 200 })
  }

  const cookieStore = await cookies()
  // If no valid cached token, fetch it
  if (!accessToken) {
    try {
      accessToken = await fetchAccessToken(token)

      if (!accessToken) {
        throw new Error('Failed to fetch access token')
      }

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
    } catch (error: any) {
      // Handle unauthorized errors
      const status = error?.response?.status

      // Clear any invalid cookies
      cookieStore.delete(ACCESS_TOKEN_COOKIE)
      cookieStore.delete(ACCESS_TOKEN_ISSUED_AT_COOKIE)

      // If it's an authentication/authorization error, return 401
      if (status === 401 || status === 403) {
        return new NextResponse(
          JSON.stringify({
            error: 'Unauthorized',
            message: 'Invalid or expired token',
          }),
          {
            status: 401,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      }

      // For other errors, redirect to home
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ token: accessToken }, { status: 200 })
}
