import { TInterest } from './../../Interests/models/common'
import { TRequest, TResponseDocs } from '@/app/store/types'

export type TGetInterests = TRequest<TPayload, TResponse>

export type TPayload = {
  title: string
  page?: number
  skip?: number
  limit?: number
  order?: number
  sortBy?: string
}

export type TResponse = TResponseDocs<TInterest[]>
