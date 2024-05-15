import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subDays,
  addDays,
  startOfDay,
  endOfDay,
} from 'date-fns'

export const getCurrentWeekDates = () => {
  const today = new Date()
  const start = startOfWeek(today)
  const end = endOfWeek(today)
  return { start, end }
}

export const getCurrentMonthDates = () => {
  const today = new Date()
  const start = startOfMonth(today)
  const end = endOfMonth(today)
  return { start, end }
}

export const getCurrentEverythingDayBefore = (isCreating: boolean) => {
  let end = new Date()
  let start = new Date()
  const today = new Date()
  const result = isCreating ? subDays(today, 2) : addDays(today, 2)

  start = isCreating ? result : today

  end = isCreating ? today : result

  return { start, end }
}

export const getCurrentDate = (isCreating: boolean, getToday?: boolean) => {
  const day = !!getToday
    ? new Date()
    : isCreating
    ? subDays(new Date(), 1)
    : addDays(new Date(), 1)

  const start = startOfDay(day)
  const end = endOfDay(day)

  console.log('start', start)
  console.log('end', end)

  return { start, end }
}
