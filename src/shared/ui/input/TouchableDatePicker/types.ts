import { TDateBottomSheetProps } from '@/widgets/bottomSheet/Date/types'

export type TTouchableDatePickerProps = {
  label?: string
  date?: string
  setDate?: (value: string) => void
  error?: string
  disabled?: boolean
  width?: string
} & Partial<
  Pick<TDateBottomSheetProps, 'pickerProps' | 'maximumDate' | 'minimumDate'>
>
