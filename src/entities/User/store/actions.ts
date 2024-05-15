import { createAction } from '@reduxjs/toolkit'
import { ActionsTypes } from './actionTypes'
import { sliceActions } from './reducer'
import { TPatchUserRequest } from '../models'
import { TDisableLoaderRequest } from './types'

export const userActions = {
  ...sliceActions,
  getAllUserRequest: createAction<TDisableLoaderRequest>(
    ActionsTypes.getAllUser,
  ),
  getCurrentUserRequest: createAction<TDisableLoaderRequest>(
    ActionsTypes.getCurrentUser,
  ),
  patchUserRequest: createAction<TPatchUserRequest['payload']>(
    ActionsTypes.patchUser,
  ),
}
