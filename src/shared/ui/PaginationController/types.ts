import { TMargin } from '../utils'

export type TPaginationControllerProps = {
  totalPages?: number
  page?: number
  onPressNext?: () => void
  onPressPrevious?: () => void
} & TMargin
