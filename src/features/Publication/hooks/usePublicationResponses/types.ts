import { EPublicationType } from '@/entities/Publication/models'
import { TUser } from '@/entities/User/models'

export type TUsePublicationResponsesProps = {
  id: string
}

export type TPublicationResponse = {
  name: string
  start: string
  user: TUser
}
