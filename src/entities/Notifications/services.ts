import { TResponse } from '@/app/store/types'

import { apiPrivate } from '@/features/api'
import {
  TGetNotificationsRequest,
  TGetNotificationByIdRequest,
  TPostNotificationSeenRequest,
} from './models'

const path = '/user/notification'

export class NotificationsService {
  static async getNotifications(
    params: TGetNotificationsRequest['payload'],
  ): TResponse<TGetNotificationsRequest['response']> {
    return apiPrivate.get(`${path}`, { params })
  }

  static async getNotificationById({
    id,
  }: TGetNotificationByIdRequest['payload']): TResponse<
    TGetNotificationByIdRequest['response']
  > {
    return apiPrivate.get(`${path}/${id}`)
  }

  static async postNotificationSeen({}: TPostNotificationSeenRequest['payload']): TResponse<
    TPostNotificationSeenRequest['response']
  > {
    console.log('PostSeen')
    return apiPrivate.post(`${path}/seen`)
  }
}
