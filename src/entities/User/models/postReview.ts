import { TRequest } from '@/app/store/types'
import { TMark } from './common'

export type TPostReviewRequest = TRequest<TPayload, TResponse>

type TPayload = {
  to: string
  project: string
  title: string
  description: string
  mark: Partial<TMark>
}

type TResponse = {
  firebaseEmail: boolean
  firebasePhone: boolean
  localEmail: boolean
  localPhone: boolean
  login: boolean
}
