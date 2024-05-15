import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TInitialCategoriesState } from './types'
import { Reducers } from '@/app/store/tools'
import { EStoreReducer } from '@/app/store/types'
import { TGetCategoriesRequest } from '../models'

const initialState: TInitialCategoriesState = {
  categories: {
    docs: [],
    totalCount: 0,
  },

  loading: false,
}

export const slice = createSlice({
  name: EStoreReducer.categories,
  initialState,
  reducers: {
    setState: Reducers.setState<TInitialCategoriesState>(),
    clearState: Reducers.clearState<TInitialCategoriesState>(initialState),
    // setError: Reducers.setError<TInitialUserState>(),

    setCategories: (
      state,
      { payload }: PayloadAction<TGetCategoriesRequest['response']>,
    ) => {
      state.categories = payload
    },

    setMoreCategories: (
      state,
      { payload }: PayloadAction<TGetCategoriesRequest['response']>,
    ) => {
      state.categories = {
        totalCount: payload.totalCount,
        docs: [...state.categories.docs, ...payload.docs],
      }
    },
  },
})

export const sliceActions = slice.actions

export default slice.reducer
