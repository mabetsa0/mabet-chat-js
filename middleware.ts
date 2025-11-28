import { NextRequest, NextResponse } from 'next/server'
import { mainApi } from './services/axios'

const ACCESS_TOKEN_COOKIE = 'chat_admin_access_token'
const ACCESS_TOKEN_ISSUED_AT_COOKIE = 'chat_admin_access_token_issued_at'
const ACCESS_TOKEN_HEADER = 'x-access-token'
const SIX_HOURS_MS = 6 * 60 * 60 * 1000

const getCachedToken = (request: NextRequest) => {
  const tokenCookie = request.cookies.get(ACCESS_TOKEN_COOKIE)
  const issuedAtCookie = request.cookies.get(ACCESS_TOKEN_ISSUED_AT_COOKIE)

  if (!tokenCookie || !issuedAtCookie) return null

  const issuedAt = Number(issuedAtCookie.value)
  if (Number.isNaN(issuedAt)) return null

  const isExpired = Date.now() - issuedAt > SIX_HOURS_MS

  // return isExpired ? null : tokenCookie.value
  return ''
}

const fetchAccessToken = async (token: string) => {
  const response = await mainApi.post<{ token: string }>(
    `/chat/api/v2/chat-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${decodeURIComponent(token)}`,
      },
    }
  )
  return response.data.token
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Extract token from URL
  const pathParts = pathname.split('/')
  let tokenParam: string | undefined
  if (pathParts.includes('admin')) {
    const tokenIndex = pathParts.indexOf('admin') + 1

    tokenParam = pathParts[tokenIndex]
  } else if (pathParts.includes('user')) {
    const tokenIndex = pathParts.indexOf('user') + 1
    tokenParam = pathParts[tokenIndex]
  }

  if (!tokenParam) {
    return NextResponse.next()
  }

  const token = decodeURIComponent(tokenParam)

  // Check for cached token
  let accessToken = getCachedToken(request)

  // If no valid cached token, fetch it
  if (!accessToken) {
    try {
      accessToken = await fetchAccessToken(token)

      // Save to cookies
      const expiresAt = new Date(Date.now() + SIX_HOURS_MS)
      const response = NextResponse.next()

      response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        expires: expiresAt,
        path: '/',
      })

      response.cookies.set(
        ACCESS_TOKEN_ISSUED_AT_COOKIE,
        Date.now().toString(),
        {
          httpOnly: true,
          sameSite: 'lax',
          secure: true,
          expires: expiresAt,
          path: '/',
        }
      )

      // Set header for pages/layouts to access
      response.headers.set(ACCESS_TOKEN_HEADER, accessToken)

      return response
    } catch (error) {
      console.error('Failed to fetch access token:', error)
      return NextResponse.next()
    }
  }

  // Set header for pages/layouts to access
  const response = NextResponse.next()
  response.headers.set(ACCESS_TOKEN_HEADER, accessToken)

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'],
}
