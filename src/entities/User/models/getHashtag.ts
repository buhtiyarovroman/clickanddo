import { TRequest } from '@/app/store/types'
import { THashTagStatus, TSearchHashTag } from './common'

export type TGetHashtagRequest = TRequest<TPayload, TResponse>

type TPayload = Partial<{
  interest: string[]
  category: string[]
  title: string
  page: number
  skip: number
  limit: number
  order: number
  sortBy: string
  status: THashTagStatus
  lang: string
}>

type TResponse = {
  took: number
  timed_out: boolean
  hits: {
    total: {
      value: number
      relation: string
    }
    max_score: number
    hits: TSearchHashTag[]
  }
}
