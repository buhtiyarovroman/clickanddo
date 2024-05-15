import { TRequest, TResponseDocs } from '@/app/store/types'
import { TInterest } from './common'

export type TGetInterestByCategory = TRequest<TPayload, TResponse>

export type TPayload = {
  category: string[]
  skip: number
  limit: number
}
export type TResponse = TResponseDocs<TInterest[]>
