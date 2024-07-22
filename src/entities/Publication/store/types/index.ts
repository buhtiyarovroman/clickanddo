import { THashTag } from './../../../User/models/common'
import {
  EPublicationType,
  TGetPublicationRequest,
  TPublication,
} from '../../models'
import { TCurrencyValue } from '@/widgets/bottomSheet/Currency/types'

export type TInitialPublicationState = {
  myPublication: TGetPublicationRequest['response']
  createPublication: TCreatePublication
  singlePublication: TPublication | null
  listFilters: {
    type?: EPublicationType[]
    min?: number
    max?: number
    longitude?: number
    latitude?: number
    radius?: number
    address?: string
    needAddressTranslate?: boolean
    hashtag?: string[]
  }
}

export type TCreatePublication = {
  id?: string
  images: string[]
  location: string
  title: string
  description: string
  price: string
  currency: TCurrencyValue
  hideLikes: boolean
  coordinates: number[]
  hashtag: THashTag[]
}
