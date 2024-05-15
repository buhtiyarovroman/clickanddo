import { dateLocale } from '@/shared/utils'
import { formatDistanceToNow, parseISO } from 'date-fns'
import i18next from 'i18next'

export const formatDateDistance = (createdDate?: string) => {
  const parsedDate = parseISO(createdDate || new Date().toString())
  const distance = formatDistanceToNow(parsedDate, {
    // addSuffix: true,
    locale: dateLocale[i18next.language],
  })
  return distance
}
