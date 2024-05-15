import { StyleProp, ViewStyle } from 'react-native'

type TTextArea = {
  lable?: string
  style?: StyleProp<ViewStyle>
  placeholder?: string
  error?: string
  disabled?: boolean
  disabledWithNormalStyles?: boolean
  value?: string
}
