'use client'

import React, { useState } from 'react'

import { useDebouncedCallback } from '@/hooks/use-debounced-callback'
import { parseAsString, useQueryState } from 'nuqs'
import { Input } from '../ui/input'

const SearchChats = () => {
  const [q, setQ] = useQueryState('q', parseAsString.withDefault(''))
  const [value, setValue] = useState(q)

  const search = useDebouncedCallback(setQ, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    search(e.target.value)
  }
  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="relative w-full">
        <Input
          value={value}
          onChange={handleChange}
          placeholder="ابحث عن محادثة ......"
          className="ite h-10 rounded-3xl pr-12 placeholder:font-bold"
        />
        <svg
          className="absolute top-1/2 right-3 -translate-y-1/2"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M0.619831 17.0189L5.35728 12.9902C5.84727 12.549 6.37101 12.3478 6.79351 12.3665C5.5362 10.8922 4.89828 8.98845 5.01343 7.05424C5.12857 5.12002 5.98784 3.30543 7.41118 1.99068C8.83452 0.675932 10.7115 -0.0369264 12.6487 0.00147467C14.586 0.0398757 16.4332 0.826556 17.8033 2.19668C19.1734 3.56679 19.9601 5.41402 19.9985 7.35128C20.0369 9.28854 19.3241 11.1655 18.0093 12.5888C16.6946 14.0122 14.88 14.8714 12.9458 14.9866C11.0115 15.1017 9.10782 14.4638 7.6335 13.2065C7.6535 13.629 7.451 14.1527 7.00976 14.6427L2.98105 19.3802C2.29106 20.1464 1.16483 20.2114 0.477333 19.5239C-0.210159 18.8364 -0.145161 17.7089 0.62108 17.0202L0.619831 17.0189ZM12.4997 12.499C13.8258 12.499 15.0975 11.9722 16.0352 11.0346C16.9729 10.0969 17.4996 8.82512 17.4996 7.49906C17.4996 6.17299 16.9729 4.90124 16.0352 3.96357C15.0975 3.02589 13.8258 2.49912 12.4997 2.49912C11.1736 2.49912 9.90187 3.02589 8.9642 3.96357C8.02653 4.90124 7.49975 6.17299 7.49975 7.49906C7.49975 8.82512 8.02653 10.0969 8.9642 11.0346C9.90187 11.9722 11.1736 12.499 12.4997 12.499Z"
            fill="#494949"
          />
        </svg>
      </div>
    </div>
  )
}

export default SearchChats
