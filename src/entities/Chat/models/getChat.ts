import { TRequest, TResponseDocs } from '../../../app/store/types'
import { TChat } from './common'

export type TGetChatRequest = TRequest<TPayload, TResponse>

type TPayload = {
  members?: string[]
  page?: number
  skip?: number
  limit?: number
  order?: number
  sortBy?: string
  project?: string
  isProject?: boolean
}

type TResponse = TResponseDocs<TChat[]>
