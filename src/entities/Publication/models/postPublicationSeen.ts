import { TRequest } from '@/app/store/types'

export type TPostPublicationSeenRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
}

type TResponse = {}
