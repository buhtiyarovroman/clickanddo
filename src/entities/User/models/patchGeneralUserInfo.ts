import { TRequest } from '@/app/store/types'
import { TPostGeneralUser } from './common'

export type TPatchGeneralUserInfoRequest = TRequest<TPayload, TResponse>

type TPayload = TPostGeneralUser

type TResponse = {
  name: string
  phone: string
  email: string
  location: string
}
