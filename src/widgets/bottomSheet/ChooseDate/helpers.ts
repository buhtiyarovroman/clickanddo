import { TPostProjectRequest } from '@/entities/Projects/models'
import { TPublication } from '@/entities/Publication/models'
import { UserService } from '@/entities/User/services'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'
import {
  addDays,
  setMilliseconds,
  setSeconds,
  setMinutes,
  setHours,
  addMinutes,
} from 'date-fns'

export const getDatesArray = () => {
  const today = new Date()

  let dates: Date[] = []

  for (let i = 0; i < 30; i++) {
    const nextDate = addDays(today, i)
    dates.push(nextDate)
  }

  return dates
}

export const getHoursArray = () => {
  const today = new Date().setHours(9, 0)

  const hours = setMilliseconds(
    setSeconds(setMinutes(setHours(today, 9), 0), 0),
    0,
  )

  let time: Date[] = []

  for (let i = 0; i < 18; i++) {
    const nextDate = addMinutes(hours, i * 30)
    time.push(nextDate)
  }

  return time
}

export const isValidTime = (inputDate: Date) => {
  const currentTime = new Date()

  const currentHours = currentTime.getHours()
  const currentMinutes = currentTime.getMinutes()

  const inputHours = inputDate.getHours()
  const inputMinutes = inputDate.getMinutes()

  return (
    currentHours < inputHours ||
    (currentHours === inputHours && currentMinutes < inputMinutes)
  )
}

export const areDatesEqual = (date1: Date, date2: Date) => {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())

  return d1.getTime() === d2.getTime()
}

export const areHoursEqual = (date1: Date, date2: Date) => {
  return (
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes()
  )
}

export const transformPublicationToProject = async (
  publication: TPublication,
  date: Date,
  time: Date,
): Promise<TPostProjectRequest['payload']> => {
  const { data: user } = await UserService.getUserById({
    id: publication.owner,
  })

  const combined = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds(),
  )

  return {
    origin: publication._id,
    originType: publication.type,
    name: publication.heading,
    description: publication.description,
    relevantUntil: publication.relevantUntil,
    budget: 0,
    startDate: combined.toString(),
    currency: publication.currency,
    hashtag: publication.hashtag.map(el => el._id),
    location: publication.location,
    specialist: publication.owner,
    projectResponses: [
      {
        name: user.name,
        secondName: user.secondName,
        photo: user.photo,
        specialist: user._id,
      },
    ],
    status: EProjectTypes.pending_specialist,
  }
}
