import { createAction } from '@reduxjs/toolkit'
import { ActionsTypes } from './actionTypes'
import { sliceActions } from './reducer'
import { TPostProjectViewRequest } from '../models'

export const projectsActions = {
  ...sliceActions,
  patchUserRequest: createAction<TPostProjectViewRequest['payload']>(
    ActionsTypes.postViewRequest,
  ),
}
