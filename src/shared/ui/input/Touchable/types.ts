import { StyleProp, TextInputProps, ViewStyle } from 'react-native'
import { TMargin } from '../../utils'
import { TIconsKeys } from '@assets/Svg'
import { TIconProps } from '../../Icon/types'

export type TStandard = {
  label?: string
  style?: StyleProp<ViewStyle>
  inputContainerStyle?: StyleProp<ViewStyle>
  placeholder?: string
  error?: string
  value?: string
  leftIcon?: TIconsKeys
  rightIcon?: TIconsKeys
  onChange?: (text: string) => void
  onPress?: () => void
  onPressRightIcon?: () => void
  notRequired?: boolean
  leftIconProps?: TIconProps
  rightIconProps?: Omit<TIconProps, 'name'>
  withSwitch?: boolean
  keyboardType?: TextInputProps['keyboardType']
  disabled?: boolean
  multiline?: boolean
  autoFocus?: boolean
  onSubmitEditing?: () => void
  autoComplete?: TextInputProps['autoComplete']
  disableLabel?: boolean
  disableRightIcon?: boolean
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
