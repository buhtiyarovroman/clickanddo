import { TRequest } from '@/app/store/types'
import { TNotification } from './common'

export type TGetNotificationByIdRequest = TRequest<TPayload, TResponse>

type TPayload = { id: string }

type TResponse = TNotification
