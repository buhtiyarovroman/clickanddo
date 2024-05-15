import { ViewStyle, StyleProp } from 'react-native'
import { ReactNode } from 'react'

export type TCustomBottomBar = {
  containerStyle?: StyleProp<ViewStyle>
  children?: ReactNode
  withoutMargin?: boolean
  getHeight?: (value: number) => void
}
