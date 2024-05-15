import { TRequest } from '@/app/store/types'
import {
  TAnotherExperience,
  TUser,
  TUserEducation,
  TUserLanguage,
  TUserWork,
} from './common'

export type TPatchUserRequest = TRequest<TPayload, TResponse>

type TPayload = Partial<{
  name: string
  secondName: string | null
  fatherName: string
  description: string
  country: string
  education: TUserEducation[]
  work: TUserWork[]
  anotherExperience: TAnotherExperience[]
  languages: TUserLanguage[]
  location: Location
  login: string
  hashtag: string[]
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  about?: string
  role: string
}>

export interface Location {
  type: string
  coordinates: number[]
}

type TResponse = TUser
