import { createAction } from '@reduxjs/toolkit'
import {
  TGetPublicationByIdRequest,
  TPostPublicationSeenRequest,
} from '../models'
import { ActionsTypes } from './actionTypes'
import { sliceActions } from './reducer'

export const publicationActions = {
  ...sliceActions,
  getSinglePublicationRequest: createAction<
    TGetPublicationByIdRequest['payload']
  >(ActionsTypes.getSinglePublicationRequest),

  postPublicationSeenRequest: createAction<
    TPostPublicationSeenRequest['payload']
  >(ActionsTypes.postPublicationSeenRequest),
}
