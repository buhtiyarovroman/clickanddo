import { TRootState } from '@/app/store'
import { EStoreReducer } from '@/app/store/types'

export const getCategorySelector = (state: TRootState) =>
  state[EStoreReducer.categories]
