import { TMargin } from '@/shared/ui/utils'
import { TUser } from '../models'

export type TUserSessionProps = {
  isActive?: boolean
  isOpen?: boolean
  onPress?: () => void
  showCountMessage?: boolean
} & Partial<
  Pick<TUser, 'role' | 'name' | 'secondName' | 'photo' | '_id' | 'login'>
> &
  Partial<TUserImageProps> &
  TMargin

export type TUserImageProps = {
  isSelected: boolean
}
