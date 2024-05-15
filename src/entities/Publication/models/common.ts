import { THashTag, TUser } from './../../User/models/common'
import { TCategory } from './../../Category/models/common'
import { TInterest } from './../../Interests/models/common'
import { ECurrency } from '@/entities/Skillbox/store/types'
export type TPublication = {
  _id: string

  owner: string
  category: TCategory
  subcategory: TInterest
  heading: string
  location: TPublicationLocation
  images: string[]
  description: string
  duration: number
  hashtag: THashTag[]
  price: number
  oldPrice: number
  hideLikes: boolean
  currency: `${ECurrency}`
  likes: number
  dislikes: number
  minPrice: number
  maxPrice: number
  relevantUntil: string
  favorites: number
  type: `${EPublicationType}`
  createdAt: string
  updatedAt: string
  address: string
  imageWidth?: number
  imageHeight?: number
  userVote: TUserRatePublication
  range?: number
  projects?: number
  userProject?: string
  views?: number
}

export type TUserRatePublication = 'like' | 'dislike' | null

export type TPublicationLocation = {
  type: string
  coordinates: number[]
}

export enum EPublicationType {
  publication = 'publication',
  skillbox = 'skillbox',
  specialOffer = 'special-offer',
}

export type TComment = {
  __v: number
  _id: string
  comment: string
  createdAt: string
  owner: TUser
  to: string
  updatedAt: string
  replyTo?: string
  replies?: TComment[]
  repliesCount?: number
}
