import { headers } from 'next/headers'

const ACCESS_TOKEN_HEADER = 'x-access-token'

/**
 * Get the access token from request headers (set by middleware)
 */
export async function getAccessTokenFromHeaders(): Promise<string | null> {
  const headersList = await headers()
  return headersList.get(ACCESS_TOKEN_HEADER)
}
