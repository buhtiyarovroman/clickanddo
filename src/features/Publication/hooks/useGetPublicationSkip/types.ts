import { EPublicationType } from '@/entities/Publication/models'

export type TUseGetPublicationSkipProps = {
  limit?: number
  type?: `${EPublicationType}`
}
