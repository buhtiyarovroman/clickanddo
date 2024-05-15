import { TRootState } from '@/app/store'
import { EStoreReducer } from '@/app/store/types'

export const getChatSelector = (state: TRootState) => state[EStoreReducer.chat]
