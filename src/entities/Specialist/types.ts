import { TUser } from '../User/models'
import { TRequest, TResponseDocs } from './../../app/store/types'
export type TGetSpecialists = TRequest<TPayload, TResponse>

export type TPayload = {
  skip?: number
  interest?: string[]
  hashtag?: string[]
  role: 'customer' | 'specialist'
  limit?: number
  location?: number[]
  login?: string
  maxDistance?: number
  category?: string[]
}

export type TResponse = TResponseDocs<TUser[]>
