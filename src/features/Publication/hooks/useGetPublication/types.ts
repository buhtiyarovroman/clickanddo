import { EPublicationType } from '@/entities/Publication/models'

export type TUseGetPublicationProps = {
  limit?: number
  type?: `${EPublicationType}`
  newItem?: string | undefined
  ownerId?: string
}
