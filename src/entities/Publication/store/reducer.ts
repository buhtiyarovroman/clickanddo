import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TCreatePublication, TInitialPublicationState } from './types'
import { Reducers } from '@/app/store/tools'
import { EStoreReducer } from '@/app/store/types'

const defaultCreatePublication: TCreatePublication = {
  id: '',
  images: [],
  location: '',
  title: '',
  description: '',
  price: '',
  currency: 'USD',
  hideLikes: true,
  coordinates: [],
  hashtag: [],
}

const defaultFilters = {
  type: [],
}

const initialState: TInitialPublicationState = {
  myPublication: {
    docs: [],
    totalCount: 0,
    filterData: [],
  },
  createPublication: defaultCreatePublication,
  singlePublication: null,
  listFilters: defaultFilters,
}

export const slice = createSlice({
  name: EStoreReducer.publication,
  initialState,
  reducers: {
    setState: Reducers.setState<TInitialPublicationState>(),
    clearState: Reducers.clearState<TInitialPublicationState>(initialState),
    clearSinglePublication: (state, {}: PayloadAction<void>) => {
      state.singlePublication = null
    },
    setCreatePublicationDefault: (state, {}: PayloadAction<void>) => {
      state.createPublication = defaultCreatePublication
    },
  },
})

export const sliceActions = slice.actions

export default slice.reducer
