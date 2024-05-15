import { StyleProp, ViewStyle } from 'react-native'
import { TMargin } from '../../utils'

export type TPhone = {
  style?: StyleProp<ViewStyle>
  error?: string
  value: string
  onChange: (text: string) => void
} & Partial<TContainer> &
  Pick<Partial<TStyledInputContainer>, 'height'>

export type TContainer = {
  width: string
} & TMargin

export type TStyledInputContainer = {
  height: string
  hasError: boolean
}

export type TStyledInput = {
  hasLeftIcon: boolean
  hasRightIcon: boolean
}
