import { TRequest } from '@/app/store/types'
import { TUser } from './common'

export type TPatchUserMePhotoRequest = TRequest<TPayload, TResponse>

type TPayload = {
  photo: string
}

type TResponse = TUser
