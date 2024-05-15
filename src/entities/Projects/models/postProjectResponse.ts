import { TRequest } from '@/app/store/types'
import { TProject } from './common'

export type TPostProjectResponseRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
  specialist: string
  description: string
  name: string
  secondName: string
  photo: string
  title: string
  currency: string
  price: number
}

type TResponse = TProject
