import { TRootState } from '@/app/store'
import { EStoreReducer } from '@/app/store/types'

export const getUserSelector = (state: TRootState) => state[EStoreReducer.user]
