import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TInitialProjectsState, TCreateProjectData } from './types'
import { Reducers } from '@/app/store/tools'
import { EStoreReducer } from '@/app/store/types'
import { THashTag } from '@/entities/User/models'

const defaultCreateProject: TCreateProjectData = {
  id: '',
  name: '',
  description: '',
  hashtag: [],
  images: [],
  additionalService: {
    name: '',
    description: '',
    hashtag: [],
  },
  budget: 0,
  currency: 'USD',
}

const initialState: TInitialProjectsState = {
  createProjects: defaultCreateProject,
  loading: false,
  filterHashtag: [],
  filterHome: {},
}

export const slice = createSlice({
  name: EStoreReducer.projects,
  initialState,
  reducers: {
    setState: Reducers.setState<TInitialProjectsState>(),
    clearState: Reducers.clearState<TInitialProjectsState>(initialState),
    // setError: Reducers.setError<TInitialUserState>(),

    setProjectFields: (
      state,
      { payload }: PayloadAction<Partial<TCreateProjectData>>,
    ) => {
      state.createProjects = {
        ...state.createProjects,
        ...payload,
      }
    },

    clearProjectCreate: (state, {}: PayloadAction<void>) => {
      state.createProjects = defaultCreateProject
    },

    setFilterHashtag: (state, { payload }: PayloadAction<THashTag[]>) => {
      state.filterHashtag = payload
    },
  },
})

export const sliceActions = slice.actions

export default slice.reducer
