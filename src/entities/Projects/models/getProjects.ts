import { TRequest, TResponseDocs } from '@/app/store/types'
import { TProject } from './common'

export type TGetProjectsRequest = TRequest<TPayload, TResponse>

type TPayload = Partial<{
  page: number
  skip: number
  limit: number
  order: number
  sortBy: string
  tags?: string[]
}>

type TResponse = TResponseDocs<TProject[]>
