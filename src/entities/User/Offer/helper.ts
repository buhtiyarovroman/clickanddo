import { TFunction } from 'i18next'

export const getTimeCount = (count: number, startKey?: string) => {
  let key = startKey || 'hour_count'
  if (count >= 5 && count <= 20) {
    return `${key}.other`
  }
  if (count === 1) {
    return `${key}.one`
  }
  if (count >= 2 && count <= 4) {
    return `${key}.two`
  }
  return `${key}.other`
}

export const calculateTime = (hours: number, t: TFunction) => {
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const remainderDays = hours % 24

  if (months > 0) {
    return `${months} ${t(getTimeCount(months, 'month'))}`
  }
  if (weeks > 0) {
    return `${weeks} ${t(getTimeCount(months, 'weeks'))}`
  }
  if (days > 0) {
    return `${days} ${t(getTimeCount(months, 'days'))}`
  }

  return `${remainderDays} ${t(getTimeCount(months, 'days'))}`
}
