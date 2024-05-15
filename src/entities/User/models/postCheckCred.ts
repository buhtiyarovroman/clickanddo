import { TRequest } from '@/app/store/types'

export type TPostCheckCredRequest = TRequest<TPayload, TResponse>

type TPayload = {
  phone?: string
  email?: string
  login?: string
  firebaseId?: string
}

type TResponse = {
  firebaseEmail: boolean
  firebasePhone: boolean
  localEmail: boolean
  localPhone: boolean
  login: boolean
}
