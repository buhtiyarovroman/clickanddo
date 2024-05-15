import { TImageType } from '@/shared/ui/image/Standard/types'
import { TPhotoMenuProps } from '../input/PhotoMenu/types'
import { TMargin } from '../utils'
import { ImageStyle, StyleProp } from 'react-native'

export type TPhotosPickProps = {
  photos?: TPhotosProps[]
  withTitle?: boolean
  onChange?: (value: TPhotosProps[]) => void
  imageType?: TImageType
  multiple?: boolean
  error?: string
  imageStyle?: StyleProp<ImageStyle>
} & Partial<Pick<TPhotoMenuProps, 'maxFiles' | 'renderContent'>> &
  TMargin

export type TPhotosProps = {
  id: string
  path: string
}
