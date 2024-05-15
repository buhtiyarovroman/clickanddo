import { EPublicationType } from '@/entities/Publication/models'

export type TUseGetPublicationProps = {
  limit?: number
  type?: `${EPublicationType}`
  newItem?: string | undefined
  hashtag?: string[]
  sortBy?: string
  location?: number[]
  address?: string
}
