import { TRequest } from '../../../app/store/types'

export type TDeleteChatRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
}

type TResponse = {}
