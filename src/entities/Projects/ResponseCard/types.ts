import { TMargin } from '@/shared/ui/utils'
import { TProjectResponse } from '../models'

export type TResponseCardProps = {
  onPress?: () => void
  isCustomer?: boolean
  disableButton?: boolean
  projectId?: string
  onRefresh?: () => void
  disableDate?: boolean
  onPressUser?: () => void
} & Partial<TProjectResponse> &
  TMargin
