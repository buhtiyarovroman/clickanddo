import { TRequest } from '@/app/store/types'

export type TPostProjectViewRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
}

type TResponse = {}
