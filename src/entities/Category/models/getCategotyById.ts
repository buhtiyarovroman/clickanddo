import { TRequest } from '@/app/store/types'
import { TCategory } from './common'

export type TGetCategoryByIdRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
}

type TResponse = TCategory
