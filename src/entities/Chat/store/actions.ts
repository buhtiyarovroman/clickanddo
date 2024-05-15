import { createAction } from '@reduxjs/toolkit'
import { ActionsTypes } from './actionTypes'
import { sliceActions } from './reducer'
import {
  TGetAllUnreadCountRequest,
  TGetChatRequest,
  TPostSeenRequest,
} from '../models'
import { TPostMessage } from './types/postMessage'

export const chatActions = {
  ...sliceActions,
  patchUserRequest: createAction<TGetChatRequest['payload']>(
    ActionsTypes.getChatsRequest,
  ),
  postSeenRequest: createAction<TPostSeenRequest['payload']>(
    ActionsTypes.postSeenRequest,
  ),
  postMessageRequest: createAction<TPostMessage>(
    ActionsTypes.postMessageRequest,
  ),
  getAllUnreadCountRequest: createAction<TGetAllUnreadCountRequest['payload']>(
    ActionsTypes.getAllUnreadCountRequest,
  ),
}
