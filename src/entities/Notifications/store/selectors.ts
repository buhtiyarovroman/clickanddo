import { TRootState } from '@/app/store'
import { EStoreReducer } from '@/app/store/types'

export const getNotificationSelector = (state: TRootState) =>
  state[EStoreReducer.notifications]
