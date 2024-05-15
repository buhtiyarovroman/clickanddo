import { createAction } from '@reduxjs/toolkit'
import { ActionsTypes } from './actionTypes'
import { sliceActions } from './reducer'
import { TGetNotificationsRequest } from '../models'

export const notificationsActions = {
  ...sliceActions,
  getNotificationsRequest: createAction<TGetNotificationsRequest['payload']>(
    ActionsTypes.getNotifications,
  ),
}
