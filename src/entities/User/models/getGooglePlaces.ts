import { TRequest } from '@/app/store/types'
import { TPredictionPlace } from './common'

export type TGetGooglePlaceRequest = TRequest<TPayload, TResponse>

type TPayload = {
  input: string
}

type TResponse = { predictions: TPredictionPlace[] }
