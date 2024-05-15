import { TRequest, TResponseDocs } from '@/app/store/types'
import { TCategory } from './common'

export type TGetCategoriesRequest = TRequest<TPayload, TResponse>

type TPayload = Partial<{
  page: number
  skip: number
  limit: number
  order: number
  sortBy: string
}>

type TResponse = TResponseDocs<TCategory[]>
