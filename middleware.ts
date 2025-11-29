import { NextRequest, NextResponse } from 'next/server'

const ACCESS_TOKEN_COOKIE = 'chat_admin_access_token'
const ACCESS_TOKEN_ISSUED_AT_COOKIE = 'chat_admin_access_token_issued_at'
const ACCESS_TOKEN_HEADER = 'x-access-token'
const SIX_HOURS_MS = 6 * 60 * 60 * 1000

// Get base URL for API calls (compatible with Edge Runtime)
// NEXT_PUBLIC_* variables are available at build time in Edge Runtime
const getMainBaseURL = () => {
  // In Edge Runtime, we can access NEXT_PUBLIC_* env vars directly
  // They're replaced at build time
  const isTest = process.env.NEXT_PUBLIC_TEST === 'true'
  return isTest ? 'https://mabet.dev' : 'https://app.mabet.com.sa'
}

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
  const baseURL = getMainBaseURL()
  const response = await fetch(`${baseURL}/chat/api/v2/chat-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${decodeURIComponent(token)}`,
    },
    body: JSON.stringify({}),
  })

  if (!response.ok) {
    const error: any = new Error(`HTTP error! status: ${response.status}`)
    error.response = { status: response.status }
    throw error
  }

  const data = await response.json()
  return data.token
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Manual path filtering for Netlify compatibility
  // Skip static files, API routes, and other non-page routes
  // This is important because Netlify may not respect the matcher config
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.match(
      /\.(ico|png|jpg|jpeg|gif|svg|webp|css|js|woff|woff2|ttf|eot)$/i
    ) // Skip static assets
  ) {
    return NextResponse.next()
  }

  // Extract token from URL
  const pathParts = pathname.split('/')
  console.log('🚀 ~ middleware ~ pathParts:', pathParts)
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

      if (!accessToken) {
        throw new Error('Failed to fetch access token')
      }

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
    } catch (error: any) {
      // Handle unauthorized errors
      const status = error?.response?.status

      // Clear any invalid cookies
      const errorResponse = NextResponse.redirect(new URL('/', request.url))
      errorResponse.cookies.delete(ACCESS_TOKEN_COOKIE)
      errorResponse.cookies.delete(ACCESS_TOKEN_ISSUED_AT_COOKIE)

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
      return errorResponse
    }
  }

  // Set header for pages/layouts to access
  const response = NextResponse.next()
  response.headers.set(ACCESS_TOKEN_HEADER, accessToken)

  return response
}

export const config = {
  // Netlify-compatible matcher pattern
  // Use simpler patterns that Netlify can handle better
  matcher: ['/admin/:path*', '/user/:path*'],
}
