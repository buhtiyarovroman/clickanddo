import { TRequest } from '@/app/store/types'
import { TProject } from './common'

export type TPatchProjectPhotoRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
  images: string[]
  oldImages: string[]
}

type TResponse = TProject
