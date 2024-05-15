import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'

import { userActions } from './actions'
import { ActionsTypes } from './actionTypes'
import { captureException } from '@sentry/react-native'
import { UserEntities } from '..'
import {
  TGetAllUsersRequest,
  TGetUserMeRequest,
  TPatchUserRequest,
} from '../models'
import { TSagaResponse } from '@/app/store/types'
import auth from '@react-native-firebase/auth'
import axios from 'axios'
import { TDisableLoaderRequest } from './types'

function* getAllUserWorker({
  payload: { disableLoader },
}: PayloadAction<TDisableLoaderRequest>) {
  if (!disableLoader) {
    yield put(userActions.setState({ loading: true }))
  }

  try {
    const firebaseId = auth().currentUser?.uid

    const params: TGetAllUsersRequest['payload'] = {
      firebaseId,
    }
    const { data }: TSagaResponse<TGetAllUsersRequest['response']> = yield call(
      UserEntities.UserService.getAllUsers,
      params,
    )
    yield put(userActions.setUserSessions(data.docs))
  } catch (e) {
    console.log(e)
    if (axios.isAxiosError(e))
      captureException(`getAllUserWorker => ${e.response?.data}`)
  }
  if (!disableLoader) {
    yield put(userActions.setState({ loading: false }))
  }
}

function* getUserMeWorker({
  payload: { disableLoader },
}: PayloadAction<TDisableLoaderRequest>) {
  if (!disableLoader) {
    yield put(userActions.setState({ loading: true }))
  }
  try {
    const { data }: TSagaResponse<TGetUserMeRequest['response']> = yield call(
      UserEntities.UserService.getUserMe,
      {},
    )

    yield put(userActions.setUser(data))
  } catch (e) {
    console.log('getUserMeWorker =>', e)
    if (axios.isAxiosError(e))
      captureException(`getUserMeWorker => ${e.response?.data}`)
  }
  if (!disableLoader) {
    yield put(userActions.setState({ loading: false }))
  }
}

function* patchUserWorker({
  payload,
}: PayloadAction<TPatchUserRequest['payload']>) {
  yield put(userActions.setState({ loading: true }))
  try {
    yield call(UserEntities.UserService.pathUser, payload)

    yield put(userActions.getCurrentUserRequest({}))
    yield put(userActions.getAllUserRequest({}))
  } catch (e) {
    console.log(e)
    if (axios.isAxiosError(e))
      captureException(`patchUserWorker => ${e.response?.data}`)
  }
  yield put(userActions.setState({ loading: false }))
}

export function* userWatcher() {
  yield takeLatest(ActionsTypes.getAllUser, getAllUserWorker)
  yield takeLatest(ActionsTypes.getCurrentUser, getUserMeWorker)
  yield takeLatest(ActionsTypes.patchUser, patchUserWorker)
}
