import { TMargin } from '@/shared/ui/utils'
import { TCategory } from '../models'

export type TCategoryCardProps = {
  onPress?: () => void
} & Partial<TStyledCategoryCardProps> &
  Partial<Pick<TCategory, 'image' | 'title'>>

export type TStyledCategoryCardProps = {
  width: string
} & TMargin
