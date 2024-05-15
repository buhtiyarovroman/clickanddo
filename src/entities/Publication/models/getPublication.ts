import { TRequest, TResponseDocsWithFilter } from '@/app/store/types'
import { TCurrencyValue } from '@/widgets/bottomSheet/Currency/types'
import { EPublicationType, TPublication } from './common'

export type TGetPublicationRequest = TRequest<TPayload, TResponse>

type TPayload = Partial<{
  page: number
  skip: number
  limit: number
  order: number
  sortBy: string
  owner: string
  type: EPublicationType[]
  hashtag: string[]
  location: number[]
  address: string
  maxDistance: number
  radius: number
  currency: TCurrencyValue
  priceLb: number
  priceHb: number
}>

export type TListFilterData = {
  min?: number
  max?: number
}

type TResponse = TResponseDocsWithFilter<TPublication[], TListFilterData[]>
