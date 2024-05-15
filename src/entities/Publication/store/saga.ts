import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'

import { ActionsTypes } from './actionTypes'
import { captureException } from '@sentry/react-native'

import { TSagaResponse } from '@/app/store/types'
import axios from 'axios'
import {
  TGetPublicationByIdRequest,
  TPostPublicationSeenRequest,
} from '../models'
import { PublicationService } from '../services'
import { publicationActions } from './actions'

function* getSinglePublicationWorker({
  payload,
}: PayloadAction<TGetPublicationByIdRequest['payload']>) {
  try {
    const { data }: TSagaResponse<TGetPublicationByIdRequest['response']> =
      yield call(PublicationService.getPublicationById, payload)
    yield put(publicationActions.setState({ singlePublication: data }))

    yield put(publicationActions.postPublicationSeenRequest({ id: payload.id }))
  } catch (e) {
    console.log(e)
    if (axios.isAxiosError(e))
      captureException(`getAllUserWorker => ${e.response?.data}`)
  }
}

function* postPublicationSeenWorker({
  payload,
}: PayloadAction<TPostPublicationSeenRequest['payload']>) {
  try {
    yield call(PublicationService.postPublicationSeen, payload)
  } catch (e) {
    console.log(e)
    if (axios.isAxiosError(e))
      captureException(`postPublicationSeenWorker => ${e.response?.data}`)
  }
}

export function* publicationWatcher() {
  yield takeLatest(
    ActionsTypes.getSinglePublicationRequest,
    getSinglePublicationWorker,
  )

  yield takeLatest(
    ActionsTypes.postPublicationSeenRequest,
    postPublicationSeenWorker,
  )
}
