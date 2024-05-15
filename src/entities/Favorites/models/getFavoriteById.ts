import { TFavorite } from '@/entities/Favorites/models'
import { TRequest } from '@/app/store/types'

export type TGetFavoritesByIdRequest = TRequest<TPayload, TResponse>

type TPayload = {
  id: string
}

type TResponse = TFavorite
