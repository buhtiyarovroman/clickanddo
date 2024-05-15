import { TRequest } from '@/app/store/types'
import { TProject } from './common'

export type TPostProjectApproveRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
  specialist: string
}

type TResponse = TProject
