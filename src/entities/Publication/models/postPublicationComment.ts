import { TRequest } from './../../../app/store/types'
import { TComment } from './common'
export type TPostPublicationComment = TRequest<TPayload, TResponse>

type TPayload = {
  to: string
  comment: string
  replyTo?: string
}

type TResponse = TComment
