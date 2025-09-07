'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'

const BackButton = () => {
  const router = useRouter()
  return (
    <Button
      variant={'ghost'}
      onClick={() => router.back()}
      title="go back"
      size="icon"
    >
      <ChevronRight className="text-secondaryColor w-5 shrink-0" />
    </Button>
  )
}

export default BackButton
