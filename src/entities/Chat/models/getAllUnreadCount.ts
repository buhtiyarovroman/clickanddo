import { TRequest } from '../../../app/store/types'
import { TAllUnreadCount } from './common'

export type TGetAllUnreadCountRequest = TRequest<TPayload, TResponse>

type TPayload = {}

type TResponse = TAllUnreadCount[]
