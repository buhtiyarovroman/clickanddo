import { TRequest, TResponseDocs } from '../../../app/store/types'
import { TMessage } from './common'
export type TGetChatMessageRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
  chat?: string
  page?: number
  skip?: number
  limit?: number
  order?: number
  sortBy?: string
}

type TResponse = TResponseDocs<TMessage[]>
