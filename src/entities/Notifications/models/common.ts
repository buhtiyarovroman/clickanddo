import { TNotificationPayload } from '@/app/contexts/PushNotification/types'
import { TProject } from '@/entities/Projects/models'
import { TPublication } from '@/entities/Publication/models'
import { TUser } from '@/entities/User/models'

export type TNotification = {
  _id: string
  owner: string
  message: string
  payload: TNotificationPayload
  status: 'new' | 'read'
  image: string
  user?: TUser
  title: string
  createdAt: string
  project?: TProject
  publication?: TPublication
}
