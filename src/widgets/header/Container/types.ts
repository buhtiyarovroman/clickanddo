import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type TStyledContainer = {
  height: string
}

export type TStandart = {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
} & Partial<TStyledContainer>
