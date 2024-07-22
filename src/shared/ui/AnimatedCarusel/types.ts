import {
  TCarouselProps as TReanimatedCarouselProps,
  ICarouselInstance,
} from 'react-native-reanimated-carousel/lib/typescript/types'
import { StyleProp, ViewStyle } from 'react-native/types'

export type TCarouselProps = {
  loop?: boolean
  withPagination?: boolean
  data: TReanimatedCarouselProps['data']
  renderItem: TReanimatedCarouselProps['renderItem']
  height?: number
  width?: number
  onSnapToItem?: (inx: number) => void
  dotContainerStyle?: StyleProp<ViewStyle>
  mode?: 'normal-horizontal' | 'parallax'
}

export type TCarouselRef = ICarouselInstance | null
