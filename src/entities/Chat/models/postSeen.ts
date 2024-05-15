import { TRequest } from '../../../app/store/types'

export type TPostSeenRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
}

type TResponse = {}
