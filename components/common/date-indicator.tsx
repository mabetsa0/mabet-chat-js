import React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ar'
import relativeTime from 'dayjs/plugin/relativeTime'
import calendar from 'dayjs/plugin/calendar'

// Configure dayjs
dayjs.locale('ar')
dayjs.extend(relativeTime)
dayjs.extend(calendar)

type Props = {
  date: Date
}

const DateIndicator = ({ date }: Props) => {
  const formatDate = (dateString: Date) => {
    const date = dayjs(dateString)
    const now = dayjs()

    // If it's today, show "اليوم" (Today)
    if (date.isSame(now, 'day')) {
      return 'اليوم'
    }

    // If it's yesterday, show "أمس" (Yesterday)
    if (date.isSame(now.subtract(1, 'day'), 'day')) {
      return 'أمس'
    }

    // If it's this week, show the day name in Arabic
    if (date.isSame(now, 'week')) {
      return date.format('dddd')
    }

    // For older dates, show the full date in Arabic
    return date.format('DD MMMM YYYY')
  }

  return (
    <div className="sticky top-0 flex justify-center">
      <div className="text-foreground/80 w-36 rounded-3xl border border-[#EEEEEE] bg-white py-1 text-center text-sm font-semibold">
        {formatDate(date)}
      </div>
    </div>
  )
}

export default DateIndicator
