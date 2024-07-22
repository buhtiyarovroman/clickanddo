import { PayloadAction } from '@reduxjs/toolkit'
import { call, debounce, put } from 'redux-saga/effects'

import { ActionsTypes } from './actionTypes'
import { captureException } from '@sentry/react-native'

import axios from 'axios'
import { notificationsActions } from './actions'
import { NotificationsService } from '../services'
import { TGetNotificationsRequest } from '../models'
import { TSagaResponse } from '@/app/store/types'

function* getNotificationsWorker({
  payload,
}: PayloadAction<TGetNotificationsRequest['payload']>) {
  // yield put(notificationsActions.setState({ loading: true }))
  try {
    const response: TSagaResponse<TGetNotificationsRequest['response']> =
      yield call(NotificationsService.getNotifications, payload)

    yield put(notificationsActions.setNotificationsData(response.data))
  } catch (e) {
    console.log(e)
    if (axios.isAxiosError(e))
      captureException(`postSeenWorker => ${e.response?.data}`)
  }
  // yield put(notificationsActions.setState({ loading: false }))
}

export function* notificationsWatcher() {
  yield debounce(1000, ActionsTypes.getNotifications, getNotificationsWorker)
}
