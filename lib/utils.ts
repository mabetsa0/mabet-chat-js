import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formateMessageDate = (date: Date) => {
  // return dayjs(date).diff(dayjs(), 'days') < -2
  //   ? dayjs(date).format('DD,MMM YYYY')
  //   : dayjs(date).fromNow()
  return dayjs(date).format('hh:mm A')
}
