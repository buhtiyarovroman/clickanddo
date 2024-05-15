import { TRequest } from '@/app/store/types'
import { TUserRatePublication } from './common'

export type TPostPublicationRateRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
  action: TUserRatePublication
}
type TResponse = {}
