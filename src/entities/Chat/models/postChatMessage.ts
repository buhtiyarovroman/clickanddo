import { TRequest } from '../../../app/store/types'

export type TPostChatMessageRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
  chat: string
  file?: string[]
  message?: string
  to: string
}

type TResponse = {}
