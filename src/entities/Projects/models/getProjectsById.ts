import { TRequest } from '@/app/store/types'
import { TCurrencyValue } from '@/widgets/bottomSheet/Currency/types'
import { TProject } from './common'

export type TGetProjectByIdRequest = TRequest<TPayload, TResponse>

type TPayload = { id: string; currency: TCurrencyValue }

type TResponse = TProject
