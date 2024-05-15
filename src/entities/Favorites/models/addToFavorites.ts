import { TFavorite, TFavoriteType } from '@/entities/Favorites/models'
import { TRequest } from '@/app/store/types'

export type TAddToFavorites = TRequest<TPayload, TResponse>

type TPayload = {
  favorite: string
  name: string
  hashtag: string
  type: TFavoriteType
}

type TResponse = TFavorite
