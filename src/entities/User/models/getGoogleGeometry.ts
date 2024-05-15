import { TRequest } from '@/app/store/types'
import { TGeometryPlace } from './common'

export type TGetGoogleGeometryRequest = TRequest<TPayload, TResponse>

type TPayload = {
  place_id: string
}

type TResponse = { result: TGeometryPlace }
