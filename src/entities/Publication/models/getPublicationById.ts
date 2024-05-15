import { TRequest } from '@/app/store/types'
import { TCurrencyValue } from '@/widgets/bottomSheet/Currency/types'
import { TPublication } from './common'

export type TGetPublicationByIdRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
  currency?: TCurrencyValue
}

type TResponse = TPublication
