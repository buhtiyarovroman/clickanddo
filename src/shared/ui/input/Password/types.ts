import { FC } from 'react'
import { StyleProp, TextInputProps, ViewStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { TMargin } from '../../utils'

export type TStandard = {
  label?: string
  style?: StyleProp<ViewStyle>
  inputContainerStyle?: StyleProp<ViewStyle>
  error?: string
  value?: string
  LeftIcon?: FC<SvgProps>
  RightIcon?: FC<SvgProps>
  onChange?: (text: string) => void
  onPress?: () => void
  onPressRightIcon?: () => void
  notRequired?: boolean
  leftIconProps?: FC<SvgProps>
  rightIconProps?: FC<SvgProps>
  withSwitch?: boolean
  keyboardType?: TextInputProps['keyboardType']
  disabled?: boolean
  multiline?: boolean
  autoFocus?: boolean
  onSubmitEditing?: () => void
  autoComplete?: TextInputProps['autoComplete']
} & Partial<TContainer> &
  Pick<Partial<TStyledInputContainer>, 'height'>

export type TContainer = {
  width: string
  disabled: boolean
} & TMargin

export type TStyledInputContainer = {
  height: string
  hasError: boolean
  disabled: boolean
}

export type TStyledInput = {
  hasLeftIcon: boolean
  hasRightIcon: boolean
}
