import { TNotificationPayload } from '@/app/contexts/PushNotification/types'
import { ELanguages } from '@/app/i18n'
import { TProject } from '@/entities/Projects/models'
import { TPublication } from '@/entities/Publication/models'
import { TUser } from '@/entities/User/models'

export type TNotification = {
  _id: string
  owner: string
  message: {
    [key in ELanguages]: string
  }
  payload: TNotificationPayload
  status: 'new' | 'read'
  image: string
  user?: TUser
  title: {
    [key in ELanguages]: string
  }
  createdAt: string
  project?: TProject
  publication?: TPublication
}
