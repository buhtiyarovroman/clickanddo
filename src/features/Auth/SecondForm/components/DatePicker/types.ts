import { TMargin } from '@/shared/ui/utils'
import { TDateBottomSheetProps } from '@/widgets/bottomSheet/Date/types'

export type TDatePickerProps = {
  label?: string
  date?: Date
  setDate?: (value: Date) => void
  error?: string
} & Pick<Partial<TStyledInputContainer>, 'height' | 'disabled'> &
  Pick<TDateBottomSheetProps, 'pickerProps'> &
  Partial<TContainer>

export type TStyledInputContainer = {
  height: string
  hasError: boolean
  disabled: boolean
}

export type TContainer = {
  width: string
  disabled: boolean
} & TMargin
