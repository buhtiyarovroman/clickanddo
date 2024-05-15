import { THashTag } from '@/entities/User/models'

export type THashtagItemProps = {
  isActive?: boolean
  showClose?: boolean
  onPressClose?: (value: string) => void
  onPress?: (value: THashTag) => void
} & THashTag
