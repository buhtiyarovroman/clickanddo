import { TNotificationPayload } from '@/app/contexts/PushNotification/types'

export type TNotificationsCardContentProps = {} & Partial<
  Pick<TNotificationPayload, 'action' | 'id' | 'type'>
>
