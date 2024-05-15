import React from 'react'
import { EColors } from '../../Styled'
import { TIconsKeys } from '@assets/Svg'
import { StyleProp, ViewStyle } from 'react-native'

export type TSelectProps = {
  icon?: TIconsKeys
  items: Array<TSelectItem>
  verticalOffset?: number
  hideArrow?: boolean
  children?: React.ReactNode
  disabled?: boolean
  containerStyle?: StyleProp<ViewStyle>
  renderFromComponent?: () => JSX.Element
} & Partial<TStyledSelectItemProps>

export type TStyledSelectItemProps = {
  reverseItem: boolean
}

export type TSelectItem = {
  icon?: TIconsKeys
  title: string
  color?: EColors
  type?: TSelectItemType
  onPress?: () => void
}

export type TSelectItemType = 'default' | 'primary' | 'custom'
