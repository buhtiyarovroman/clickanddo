import { TRequest, TResponseDocs } from '@/app/store/types'
import { TNotification } from './common'

export type TGetNotificationsRequest = TRequest<TPayload, TResponse>

type TPayload = Partial<{
  page: number
  skip: number
  limit: number
  order: number
  sortBy: string
  status: 'new' | 'read'
}>

type TResponse = TResponseDocs<TNotification[]>
