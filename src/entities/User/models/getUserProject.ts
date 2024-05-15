import { TRequest } from '@/app/store/types'
import { TProject } from '@/entities/Projects/models'
import { EPublicationType } from '@/entities/Publication/models'
import { TCurrencyValue } from '@/widgets/bottomSheet/Currency/types'

export type TGetUserProjects = TRequest<TPayload, TResponse>

export type TPayload = {
  limit?: number
  skip?: number
  owner?: string
  specialist?: string
  status?: string[]
  projectResponses?: string
  hashtag?: string[]
  interest?: string[]
  location?: number[]
  maxDistance?: number
  order?: number
  sortBy?: string
  relevantUntil?: string
  origin?: string
  originType?: `${EPublicationType}`
  priceFrom?: number
  priceTo?: number
  currency?: TCurrencyValue
  createdLb?: string
  createdHb?: string
  relevantUntilLb?: string
  relevantUntilHb?: string
}

export type TFilterProjectData = {
  max: number
}

export type TResponse = {
  docs: TProject[]
  totalCount: number
  filterData: TFilterProjectData[]
}
