import { TRequest, TResponseDocs } from '@/app/store/types'
import { THashTag, THashTagStatus } from './common'

export type TGetHashtagRequest = TRequest<TPayload, TResponse>

type TPayload = Partial<{
  interest: string[]
  title: string
  page: number
  skip: number
  limit: number
  order: number
  sortBy: string
  status: THashTagStatus
}>

type TResponse = TResponseDocs<THashTag[]>
