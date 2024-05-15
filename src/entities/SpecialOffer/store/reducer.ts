import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TInitialSpecialOfferState, TCreateSpecialOfferData } from './types'
import { EStoreReducer } from '@/app/store/types'
import { Reducers } from '@/app/store/tools'
import { addDays } from 'date-fns'

const defaultCreateSpecialOffer: TCreateSpecialOfferData = {
  id: '',
  title: '',

  hashtag: [],
  priceFrom: 0,
  priceTo: 0,
  duration: '1',
  expirationDate: addDays(new Date(), 10),
  photos: [],
  description: '',
  currency: 'USD',
  imageHeight: 1,
  imageWidth: 1,
  address: '',
  hideLikes: true,
}

const initialState: TInitialSpecialOfferState = {
  createSpecialOffer: defaultCreateSpecialOffer,
  loading: false,
}

export const slice = createSlice({
  name: EStoreReducer.projects,
  initialState,
  reducers: {
    setState: Reducers.setState<TInitialSpecialOfferState>(),
    clearState: Reducers.clearState<TInitialSpecialOfferState>(initialState),
    setError: Reducers.setError<TInitialSpecialOfferState>(),
    setSpecialOfferFields: (
      state,
      { payload }: PayloadAction<Partial<TInitialSpecialOfferState>>,
    ) => {
      state.createSpecialOffer = {
        ...state.createSpecialOffer,
        ...payload,
      }
    },
  },
})

export const sliceActions = slice.actions

export default slice.reducer
