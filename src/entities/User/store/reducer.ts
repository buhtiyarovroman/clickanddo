import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  EExecutorSecondFormFields,
  TInitialUserState,
  TRegisterData,
} from './types'
import { Reducers } from '@/app/store/tools'
import { EStoreReducer } from '@/app/store/types'
import { TUser } from '../models'
import { EGender } from '@/shared/ui/input/Gender/types'
import { subHours, subYears } from 'date-fns'

const defaultRegisterData = {
  [EExecutorSecondFormFields.name]: '',
  [EExecutorSecondFormFields.login]: '',
  [EExecutorSecondFormFields.secondName]: '',
  [EExecutorSecondFormFields.gender]: EGender.male,
  [EExecutorSecondFormFields.birthday]: subHours(subYears(new Date(), 16), 6),
  [EExecutorSecondFormFields.country]: '',
  [EExecutorSecondFormFields.location]: [],
}

const initialState: TInitialUserState = {
  user: null,
  userSessions: [],
  seeOnboarding: false,
  loading: false,
  setting: {
    currency: 'UAH',
  },
  userLocation: null,
  registerData: defaultRegisterData,
}

export const slice = createSlice({
  name: EStoreReducer.user,
  initialState,
  reducers: {
    setState: Reducers.setState<TInitialUserState>(),
    clearState: Reducers.clearState<TInitialUserState>(initialState),
    // setError: Reducers.setError<TInitialUserState>(),

    setUser: (state, { payload }: PayloadAction<TUser>) => {
      state.user = payload
    },

    setUserSessions: (state, { payload }: PayloadAction<TUser[]>) => {
      state.userSessions = payload
    },
    logout: (state, {}: PayloadAction<void>) => {
      state.user = null
      state.userSessions = []
    },

    setSeeOnboarding: (state, { payload }: PayloadAction<boolean>) => {
      state.seeOnboarding = payload
    },

    setRegisterData: (state, { payload }: PayloadAction<TRegisterData>) => {
      state.registerData = payload
    },

    setRegisterDefault: (state, {}: PayloadAction<void>) => {
      state.registerData = defaultRegisterData
    },
  },
})

export const sliceActions = slice.actions

export default slice.reducer
