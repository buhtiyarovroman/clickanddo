import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'

import { ActionsTypes } from './actionTypes'

import { TSagaResponse } from '@/app/store/types'
import axios from 'axios'
import { categoriesActions } from './actions'
import { TGetCategoriesRequest } from '../models'
import { CategoryEntities } from '..'

function* getCategoriesWorker({
  payload,
}: PayloadAction<TGetCategoriesRequest['payload']>) {
  yield put(categoriesActions.setState({ loading: true }))
  try {
    const { data }: TSagaResponse<TGetCategoriesRequest['response']> =
      yield call(CategoryEntities.CategoryService.getCategories, payload)

    if (!payload.skip) {
      yield put(categoriesActions.setCategories(data))
    }

    if (payload.skip) {
      yield put(categoriesActions.setMoreCategories(data))
    }
  } catch (e) {
    if (axios.isAxiosError(e))
      console.log(`getCategoriesWorker => ${e.response?.data}`)
  }
  yield put(categoriesActions.setState({ loading: false }))
}

export function* categoriesWatcher() {
  yield takeLatest(ActionsTypes.getCategories, getCategoriesWorker)
}
