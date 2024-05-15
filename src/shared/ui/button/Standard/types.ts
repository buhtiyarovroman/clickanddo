import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { TIconsKeys } from '@assets/Svg'
import { EColors } from '../../Styled'
import { TMargin } from '../../utils'
import { TIconProps } from '../../Icon/types'

export type TStandard = {
  onPress?: () => void
  children?: ReactNode
  text?: string
  textColor?: EColors
  style?: StyleProp<ViewStyle>
  icon?: TIconsKeys
  iconProps?: Omit<TIconProps, 'name'>
  opacity?: number
} & Partial<TStyledButton>

export type TStyledButton = {
  width: string
  height: string
  color: EColors
  disabled: boolean
  hideBorder: boolean
  radius: number
} & TMargin

export type TStyledText = {
  disabled: boolean
  color: EColors
}
