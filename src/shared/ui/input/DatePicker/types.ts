import { TDateBottomSheetProps } from '@/widgets/bottomSheet/Date/types'
import { TMargin } from '../../utils'

export type TDatePickerProps = {
  label?: string
  date?: Date
  setDate?: (value: Date) => void
  error?: string
  withIconLeft?: boolean
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
