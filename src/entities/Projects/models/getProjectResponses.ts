import { TRequest } from '@/app/store/types'
import { TCurrencyValue } from '@/widgets/bottomSheet/Currency/types'
import { TProjectResponse } from './common'

export type TGetProjectResponsesRequest = TRequest<TPayload, TResponse>

type TPayload = { id: string; currency: TCurrencyValue }

type TResponse = TProjectResponse[]
