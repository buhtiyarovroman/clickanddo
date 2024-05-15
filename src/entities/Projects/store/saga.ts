import { PayloadAction } from '@reduxjs/toolkit'
import { call, takeLatest } from 'redux-saga/effects'

import { ActionsTypes } from './actionTypes'

import { ProjectEntities } from '..'
import { TPostProjectViewRequest } from '../models'

function* postViewProjectWorker({
  payload,
}: PayloadAction<TPostProjectViewRequest['payload']>) {
  try {
    yield call(ProjectEntities.ProjectsService.postViewProject, payload)
  } catch (e) {
    console.log('postViewProjectWorker error =>', e)
  }
}

export function* projectsWatcher() {
  yield takeLatest(ActionsTypes.postViewRequest, postViewProjectWorker)
}
