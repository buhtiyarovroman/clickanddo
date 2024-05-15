import { TRootState } from '@/app/store'
import { EStoreReducer } from '@/app/store/types'

export const getProjectsSelector = (state: TRootState) =>
  state[EStoreReducer.projects]
