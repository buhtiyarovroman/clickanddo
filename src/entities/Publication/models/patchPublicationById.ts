import { TRequest } from '@/app/store/types'
import { TPublication } from './common'
import {
  TPostPublicationRequest,
  TPostPublicationPayload,
} from './postPublication'

export type TPatchPublicationByIdRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
} & Partial<TPostPublicationRequest['payload']>

export type TPatchPublicationPayload = {
  id: string
} & Partial<TPostPublicationPayload>

type TResponse = TPublication
