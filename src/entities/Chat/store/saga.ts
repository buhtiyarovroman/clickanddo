import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { ActionsTypes } from './actionTypes'
import { captureException } from '@sentry/react-native'

import axios from 'axios'
import { chatActions } from './actions'
import { ChatEntities } from '..'
import { TGetAllUnreadCountRequest, TPostSeenRequest } from '../models'
import { TSagaResponse } from '@/app/store/types'
import { TPostMessage } from './types/postMessage'

function* postSeenWorker({
  payload,
}: PayloadAction<TPostSeenRequest['payload']>) {
  yield put(chatActions.setState({ loading: true }))
  try {
    yield call(ChatEntities.ChatService.postSeen, payload)
    yield put(chatActions.readMessagesOnChat(payload))
  } catch (e) {
    console.log(e)
    if (axios.isAxiosError(e))
      captureException(`postSeenWorker => ${e.response?.data}`)
  }
  yield put(chatActions.setState({ loading: false }))
}

function* postMessageWorker({ payload }: PayloadAction<TPostMessage>) {
  try {
    yield put(
      chatActions.setLastMessage({
        ...payload,
        files: payload.file,
        from: payload.userId,
      }),
    )

    yield call(ChatEntities.ChatService.postChatMessage, payload)
  } catch (e) {
    yield put(
      chatActions.clearLastMessage({
        ...payload,
        files: payload.file,
        from: payload.userId,
      }),
    )

    if (axios.isAxiosError(e)) {
      captureException(`postMessageWorker => ${e.response?.data}`)
      console.log(`postMessageWorker => ${e.response?.data}`)
    }
  }
}

function* getAllUnreadCountWorker({
  payload,
}: PayloadAction<TGetAllUnreadCountRequest['payload']>) {
  try {
    const { data }: TSagaResponse<TGetAllUnreadCountRequest['response']> =
      yield call(ChatEntities.ChatService.getAllUnreadCounts, payload)

    yield put(chatActions.setState({ allUnreadCount: data }))
  } catch (e) {
    if (axios.isAxiosError(e))
      console.log(`getAllUnreadCountWorker => ${e.response?.data}`)
  }
}

export function* chatWatcher() {
  yield takeLatest(ActionsTypes.postSeenRequest, postSeenWorker)
  yield takeEvery(ActionsTypes.postMessageRequest, postMessageWorker)
  yield takeEvery(
    ActionsTypes.getAllUnreadCountRequest,
    getAllUnreadCountWorker,
  )
}
