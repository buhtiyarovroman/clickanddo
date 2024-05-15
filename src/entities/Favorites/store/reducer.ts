import { TInitialFavoritesState } from './types'
import { createSlice } from '@reduxjs/toolkit'

import { Reducers } from '@/app/store/tools'
import { EStoreReducer } from '@/app/store/types'

const initialState: TInitialFavoritesState = {
  favorites: [],
}

export const slice = createSlice({
  name: EStoreReducer.favorites,
  initialState,
  reducers: {
    setState: Reducers.setState<TInitialFavoritesState>(),
    clearState: Reducers.clearState<TInitialFavoritesState>(initialState),
  },
})

export const sliceActions = slice.actions

export default slice.reducer
