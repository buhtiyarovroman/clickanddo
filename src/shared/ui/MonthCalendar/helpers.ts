import { dateLocale } from '@/shared/utils'
import {
  eachMonthOfInterval,
  startOfYear,
  endOfYear,
  format,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
} from 'date-fns'
import i18next from 'i18next'
import _ from 'lodash'

export const getMonths = (mask: string) => {
  const months = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  }).map(val =>
    _.capitalize(
      format(val, mask, {
        locale: dateLocale[i18next.language],
      }),
    ),
  )

  return months
}

export const getDays = (mask: string) => {
  const months = eachDayOfInterval({
    start: startOfWeek(new Date(), {
      weekStartsOn: 1,
    }),
    end: endOfWeek(new Date(), {
      weekStartsOn: 1,
    }),
  }).map(val =>
    _.capitalize(
      format(val, mask, {
        locale: dateLocale[i18next.language],
      }),
    ),
  )

  return months
}
