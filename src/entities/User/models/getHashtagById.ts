import { TRequest } from '@/app/store/types'
import { THashTag } from './common'

export type TGetHashtagByIdRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
}

type TResponse = THashTag
