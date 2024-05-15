import { TMargin } from '@/shared/ui/utils'
import { TDateBottomSheetProps } from '@/widgets/bottomSheet/Date/types'

export type TProjectDateTime = {
  title?: string
  date?: string
  setDate?: (date: string) => void
  maximumDate?: Date
  defaultDate?: Date
} & TMargin &
  Pick<TDateBottomSheetProps, 'maximumDate' | 'minimumDate'>
