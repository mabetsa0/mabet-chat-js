'use client'

import { fetchAccessToken } from '@/services/get-access-token'
import axios from 'axios'
import { useEffect } from 'react'

export const CacheAccessToken = ({
  cached,
  token,
}: {
  cached: boolean
  token: string
}) => {
  useEffect(() => {
    if (!cached) {
      axios.post('/api/cache-access-token', { accessToken: token })
    }
  }, [cached, token])

  return null
}
