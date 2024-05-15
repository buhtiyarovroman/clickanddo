import { EPublicationType } from '@/entities/Publication/models'

export type TPublicationScreenParams = {
  type: `${EPublicationType}`
  id: string
}
