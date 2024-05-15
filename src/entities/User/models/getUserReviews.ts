import { TRequest } from '@/app/store/types'
import { TReview } from './common'

export type TGetUserReviewsRequest = TRequest<TPayload, TResponse>

export type TPayload = {
  to?: string
  limit?: number
  skip?: number
  order?: number
}

export type TResponse = {
  docs: TReview[]
  totalCount: number
}
