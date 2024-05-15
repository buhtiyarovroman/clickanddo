import { TFavorite } from '@/entities/Favorites/models'
import { TRequest } from '@/app/store/types'

export type TGetSearchFavoritesByIdRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
}

type TResponse = TFavorite | null
