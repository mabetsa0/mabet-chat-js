'use client'

import React, { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const ChatInput = () => {
  const textAreRef = useRef<HTMLTextAreaElement>(null)

  // dynamic resizing text area
  const textRowCount = textAreRef.current
    ? textAreRef.current.value.split('\n').length
    : 1
  const rows = textRowCount <= 3 ? textRowCount : 3

  const [inputMessage, setInputMessage] = useState('')
  const handleInputMessageChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (e) => {
    setInputMessage(e.target.value)
  }

  const handleSendMessage = async () => {
    // TODO: Send message
  }

  // handling sending message using enter key
  const handleEnterKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const keyDown = e.key
    if (keyDown === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-white px-4 py-4">
      <div className="relative w-full">
        <Textarea
          ref={textAreRef}
          rows={rows}
          placeholder="اكتب ما تريد الاستفسار عنه ....."
          value={inputMessage}
          onChange={handleInputMessageChange}
          onKeyDown={handleEnterKeyDown}
          className="max-h-[90px] min-h-[40px] resize-none rounded-xl border-[#EBEBEB] bg-white py-3 pl-11 shadow placeholder:font-bold placeholder:text-[#A1A1A1]"
        />
      </div>
      <Button
        onClick={handleSendMessage}
        type="submit"
        className="shrink-0 font-bold"
      >
        ارسال
      </Button>
    </div>
  )
}

export default ChatInput
