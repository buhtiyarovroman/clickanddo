import { TPublication } from '@/entities/Publication/models'
import { TMargin } from '@/shared/ui/utils'

export type TUserOfferProps = {
  date?: string
  rating?: number
  onPress?: () => void
  isSkillBox?: boolean
} & Partial<TStyledContainer> &
  Partial<TPublication>

export type TStyledContainer = {
  width: string
} & TMargin
