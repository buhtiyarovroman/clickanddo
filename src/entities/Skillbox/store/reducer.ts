import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TCreateSkillBoxData, TInitialSpecialOfferState } from './types'
import { EStoreReducer } from '@/app/store/types'
import { Reducers } from '@/app/store/tools'
import { addDays } from 'date-fns'

const defaultCreateSkillBox: TCreateSkillBoxData = {
  id: '',
  title: '',
  category: {
    title: [],
    _id: '',
  },
  interest: {
    title: [],
    _id: '',
  },
  hashtag: [],
  initialPrice: 0,
  discount: '0',
  priceAfterDiscount: 0,
  duration: '',
  expirationDate: addDays(new Date(), 10),
  photos: [],
  description: '',
  currency: 'USD',
  location: [0, 0],
  locationRange: '',
  address: '',
  hideLikes: true,
}

const initialState: TInitialSpecialOfferState = {
  createSkillBox: defaultCreateSkillBox,
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
      state.createSkillBox = {
        ...state.createSkillBox,
        ...payload,
      }
    },
  },
})

export const sliceActions = slice.actions

export default slice.reducer
