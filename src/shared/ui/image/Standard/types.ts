import { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native'
import { TMargin } from '../../utils'
import { images } from '@/shared/config'

export type TImageType = keyof typeof images

export type TImageStandard = Partial<Omit<TStyledImage, 'source'>> & {
  source?: string | null
  type?: TImageType
  pngSource?: ImageSourcePropType
  style?: StyleProp<ImageStyle>
} & Partial<TStylesShimmer>

export type TStylesShimmer = {
  width: string
  height: string
}

export type TStyledImage = {
  borderRadius?: number

  w: string
  h: string
} & TMargin
