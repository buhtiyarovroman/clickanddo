import { TUser } from '@/entities/User/models'

export type TWidgetUserSpecialistGuest = {
  isEdit?: boolean
  user: TUser | null
}

export enum EUserSpecialistTabs {
  work = 'work',
  information = 'information',
  reviews = 'reviews',
}
