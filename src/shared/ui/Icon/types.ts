import { TIconsKeys } from '@assets/Svg'
import { StyleProp, ViewStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'

export type TIconProps = {
  style?: StyleProp<ViewStyle>
  name: TIconsKeys
  fill?: string
  size?: number
} & SvgProps

export type TIconPropsComponents = Omit<TIconProps, 'name'>
