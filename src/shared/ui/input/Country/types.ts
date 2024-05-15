import { TDateBottomSheetProps } from '@/widgets/bottomSheet/Date/types'
import { TMargin } from '../../utils'
import { CountryItem } from 'react-native-country-codes-picker'

export type TCountryProps = {
  label?: string
  value?: CountryItem['code']
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
