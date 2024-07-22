import { TMargin } from '@/shared/ui/utils'
import { TReview } from '../models'

export type TUserReviewCardProps = {
  rating?: number
  isMyProfile?: boolean
} & Partial<TStyledContainer> &
  Partial<
    Pick<TReview, 'title' | 'description' | 'createdAt' | 'mark' | 'owner'>
  >

export type TStyledContainer = {
  width: string
} & TMargin
