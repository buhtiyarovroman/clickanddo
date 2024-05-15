import { TRequest, TResponseDocs } from '@/app/store/types'

export type TDeleteFromFavorites = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
}

type TResponse = TResponseDocs<{
  owner: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}>
