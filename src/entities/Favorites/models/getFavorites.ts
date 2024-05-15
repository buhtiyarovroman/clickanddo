import { TFavorite, TFavoriteType } from '@/entities/Favorites/models'
import { TRequest, TResponseDocs } from '@/app/store/types'

export type TGetFavoritesRequest = TRequest<TPayload, TResponse>

type TPayload = Partial<{
  name: string
  type: TFavoriteType
  hashtag: string
  page: number
  skip: number
  limit: number
  order: number
  sortBy: string
}>

type TResponse = TResponseDocs<TFavorite[]>
