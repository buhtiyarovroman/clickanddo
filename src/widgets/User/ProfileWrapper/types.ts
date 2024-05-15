import { TUser } from '@/entities/User/models'

export type TUsetWidgetsProfileWrapperProps = {
  user: TUser | null
  isEdit?: boolean
}
