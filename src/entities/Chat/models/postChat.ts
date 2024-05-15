import { TRequest } from '../../../app/store/types'

export type TPostChatRequest = TRequest<TPayload, TResponse>

type TPayload = {
  members: string
  project?: string
}

type TResponse = { _id: string }
