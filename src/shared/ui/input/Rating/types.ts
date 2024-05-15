import { TMargin } from '../../utils'

export type TRatingProps = {
  value?: number
  onChange?: (value: number) => void
  size?: number
  mStar?: string
} & TMargin
