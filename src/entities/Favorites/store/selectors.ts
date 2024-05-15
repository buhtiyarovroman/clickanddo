import { TRootState } from '@/app/store'
import { EStoreReducer } from '@/app/store/types'

export const getFavoritesSelector = (state: TRootState) =>
  state[EStoreReducer.favorites]
