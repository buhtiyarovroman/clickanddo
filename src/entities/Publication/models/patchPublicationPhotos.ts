import { TPublication } from '@/entities/Publication/models'
import { TRequest } from '@/app/store/types'
export type TPatchPublicationPhoto = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
  images: string[]
  oldImages: string[]
}

type TResponse = TPublication
