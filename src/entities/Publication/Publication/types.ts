import { TMargin } from '@/shared/ui/utils'
import { TPublication } from '../models'
import { TImageStandard } from '@/shared/ui/image/Standard/types'

export type TUserPublicationProps = {
  onPress?: () => void
  imageType?: TImageStandard['type']
} & Partial<TStyledContainer> &
  Partial<TPublication>

export type TStyledContainer = {
  width: string
} & TMargin
