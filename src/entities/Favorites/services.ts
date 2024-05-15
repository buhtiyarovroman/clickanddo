import { TResponse } from '@/app/store/types'

import { apiPrivate } from '@/features/api'
import {
  TGetFavoritesRequest,
  TGetFavoritesByIdRequest,
  TGetSearchFavoritesByIdRequest,
} from './models'
import { TAddToFavorites } from './models/addToFavorites'

const path = '/user/favorite'

export class FavoritesService {
  static async getFavorites(
    params: TGetFavoritesRequest['payload'],
  ): TResponse<TGetFavoritesRequest['response']> {
    return apiPrivate.get(`${path}`, { params })
  }

  static async getFavoritesById({
    id,
  }: TGetFavoritesByIdRequest['payload']): TResponse<
    TGetFavoritesByIdRequest['response']
  > {
    return apiPrivate.get(`${path}/${id}`)
  }

  static async addToFavorites(
    body: TAddToFavorites['payload'],
  ): TResponse<TAddToFavorites['response']> {
    return apiPrivate.post(`${path}`, body)
  }

  static async getSearchById({
    id,
  }: TGetSearchFavoritesByIdRequest['payload']): TResponse<
    TGetSearchFavoritesByIdRequest['response']
  > {
    return apiPrivate.get(`${path}/${id}/by-favorite`)
  }

  static async deleteFromFavorites(id: string): TResponse {
    return apiPrivate.delete(`${path}/${id}`)
  }
}
