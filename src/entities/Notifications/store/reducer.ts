import { TInitialNotificationsState } from './types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Reducers } from '@/app/store/tools'
import { EStoreReducer } from '@/app/store/types'
import { TGetNotificationsRequest } from '../models'

const initialState: TInitialNotificationsState = {
  notifications: [],
  totalCount: 0,
}

export const slice = createSlice({
  name: EStoreReducer.favorites,
  initialState,
  reducers: {
    setState: Reducers.setState<TInitialNotificationsState>(),
    clearState: Reducers.clearState<TInitialNotificationsState>(initialState),

    setNotificationsData: (
      state,
      { payload }: PayloadAction<TGetNotificationsRequest['response']>,
    ) => {
      state.notifications = payload.docs
    },

    setNotificationsTotalCount: (state, { payload }: PayloadAction<number>) => {
      state.totalCount = payload
    },
  },
})

export const sliceActions = slice.actions

export default slice.reducer
