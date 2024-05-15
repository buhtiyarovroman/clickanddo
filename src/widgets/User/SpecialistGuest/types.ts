import { TUser } from '@/entities/User/models'

export type TWidgetUserSpecialistGuest = {
  isEdit?: boolean
  user: TUser | null
}
