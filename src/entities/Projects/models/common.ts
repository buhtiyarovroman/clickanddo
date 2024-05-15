import { EPublicationType } from '@/entities/Publication/models'
import { THashTag, TUser } from '@/entities/User/models'
import { TCurrencyValue } from '@/widgets/bottomSheet/Currency/types'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'

export type TProject = {
  _id: string
  owner: TUser
  name: string
  description: string
  status: `${EProjectTypes}`
  hashtag: THashTag[]
  images: string[]
  additionalService: TAdditionalServiceProject
  location: TLocationProject
  startDate: string
  endDate: string
  budget: number
  currency: string
  relevantUntil: string
  projectResponses: TProjectResponse[]
  createdAt: string
  specialist: TUser | undefined
  customerReview: boolean
  specialistReview: boolean
  views: number
  address?: string
  origin?: string
  originType?: `${EPublicationType}`
}

export type TAdditionalServiceProject = {
  name: string
  hashtag: THashTag[]
  description: string
}

export type TPostAdditionalServiceProject = {
  name: string
  hashtag: string[]
  description: string
}

export type TLocationProject = {
  type: string
  coordinates: number[]
}

export type TProjectResponse = {
  _id: string
  date: string
  description: string
  name: string
  photo: string
  secondName: string
  specialist: string
  status: string
  title: string
  price?: number
  currency?: TCurrencyValue
}

export type TCreateProjectResponses = {
  specialist: string
  name: string
  secondName: string
  photo: string
}
