import { THashTag } from './../../User/models/common'
import { TPublication } from '@/entities/Publication/models'
import { TUser } from '@/entities/User/models'

export enum EFavoritesTypes {
  'publication' = 'publication',
  'skillbox' = 'skillbox',
  'special-offer' = 'special-offer',
  'specialist' = 'specialist',
}

export type TFavorite = {
  type: TFavoriteType
  owner: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
  hashtag: THashTag
  name: string
  favorite: TPublication | TUser
}

export type TFavoriteType =
  | 'publication'
  | 'skillbox'
  | 'special-offer'
  | 'specialist'
