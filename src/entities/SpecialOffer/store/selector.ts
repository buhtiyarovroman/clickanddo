import { TRootState } from '@/app/store'
import { EStoreReducer } from '@/app/store/types'

export const getSpecialOfferSelector = (state: TRootState) =>
  state[EStoreReducer.specialOffer]
