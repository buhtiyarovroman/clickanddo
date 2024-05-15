import { TRequest } from '@/app/store/types'

export type TGetGeneralUserInfoRequest = TRequest<TPayload, TResponse>

type TPayload = {}

type TResponse = {
  user: string
  name: string
  phone: string
  email: string
  location: string
}
