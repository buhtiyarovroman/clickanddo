import { TRootState } from '@/app/store'
import { EStoreReducer } from '@/app/store/types'

export const getSkillBoxSelector = (state: TRootState) =>
  state[EStoreReducer.skillBox]
