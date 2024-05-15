import { TRequest } from '@/app/store/types'
import { THashTag } from './common'

export type TPostHashtagRequest = TRequest<TPayload, TResponse>

type TPayload = {
  title: {
    lang: string
    value: string
  }[]
}

type TResponse = THashTag
