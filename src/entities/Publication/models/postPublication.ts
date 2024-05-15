import { TRequest } from '@/app/store/types'
import { EPublicationType, TPublication, TPublicationLocation } from './common'

export type TPostPublicationRequest = TRequest<TPayload, TResponse>

type TPayload = {
  heading: string
  type: `${EPublicationType}`
} & TNotRequire

type TNotRequire = Partial<{
  images: string[]
  subcategory: string
  description: string
  hideLikes: boolean
  price: number
  currency: string
  location?: Partial<TPublicationLocation> | null
  duration: number
  hashtag: string[]
  oldPrice: number
  minPrice: number
  maxPrice: number
  relevantUntil: Date
  address: string
  imageWidth: number
  imageHeight: number
  range: number
}>

export type TPostPublicationPayload = Omit<TPayload, 'location'> & {
  location?: {
    type: string
    coordinates: number[]
  }
}

type TResponse = TPublication
