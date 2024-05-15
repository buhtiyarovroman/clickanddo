import { TRequest } from '@/app/store/types'

export type TPatchUserVerificationRequest = TRequest<TPayload, TResponse>

type TPayload = {
  series: string
  no: string
  id: string
  photo: string
}

type TResponse = {}
