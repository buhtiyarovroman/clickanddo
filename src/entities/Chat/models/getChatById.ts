import { TRequest } from '../../../app/store/types'
import { TChat } from './common'

export type TGetChatByIdRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
}

type TResponse = TChat
