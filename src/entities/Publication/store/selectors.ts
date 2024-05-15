import { TRootState } from '@/app/store'
import { EStoreReducer } from '@/app/store/types'

export const getPublicationSelector = (state: TRootState) =>
  state[EStoreReducer.publication]
