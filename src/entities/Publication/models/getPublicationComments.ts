import { TRequest, TResponseDocs } from '@/app/store/types'
import { TComment } from './common'
export type TGetPublicationComments = TRequest<TPayload, TResponse>

type TPayload = Partial<{
  to: string
  owner: string
  page: string
  skip: number
  limit: number
  order: number
  sortBy: string
  replyTo: string
}>
type TResponse = TResponseDocs<TComment[]>
