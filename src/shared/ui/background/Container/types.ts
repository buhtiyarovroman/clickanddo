import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type TContainerProps = {
  children: ReactNode
  containerStyle?: StyleProp<ViewStyle>
}
