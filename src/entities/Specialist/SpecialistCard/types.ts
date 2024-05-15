import { TUser } from '@/entities/User/models'
import { TMargin } from '@/shared/ui/utils'

export type TSpecialistCardProps = {
  item: TUser
  onPress?: () => void
  width?: string
} & Partial<TStyledSpecialistCardProps>

export type TStyledSpecialistCardProps = {
  width: string
} & TMargin
