import { TRequest } from '@/app/store/types'
import { TUser } from './common'

export type TGetUserMeRequest = TRequest<TPayload, TResponse>

type TPayload = {}

type TResponse = TUser
