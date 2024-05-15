import { FlexStyle, TextStyle } from 'react-native'
import { EColors } from './colors'
import { EFonts, TMargin } from '../utils'

export type TStyledTextProps = {
  size?: string
  color?: EColors
  align?: TextStyle['textAlign']
  font?: EFonts
} & TMargin

export type TFlexWrapper = {
  width?: string
  height?: string
  flexDirection?: FlexStyle['flexDirection']
  justify?: FlexStyle['justifyContent']
  align?: FlexStyle['alignItems']
  wrap?: FlexStyle['flexWrap']
} & TMargin

export type THr = TMargin & {
  color?: EColors
  vertical?: boolean
}

export type TDivider = {
  width?: number
  height?: number
  background?: string
}
