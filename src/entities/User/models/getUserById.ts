import { TRequest } from '@/app/store/types'
import { TUser } from './common'

export type TGetUserByIdRequest = TRequest<TPayload, TResponse>

type TPayload = { id: string }

type TResponse = TUser
