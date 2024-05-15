import { TUser } from '@/entities/User/models'
import { TSpecialistEdit } from '../types'

export type TSpecialistUserSpecialistGuestTabsProps = {
  user?: TUser | null
} & TSpecialistEdit

export enum EUserSpecialistTabs {
  work = 'work',
  information = 'information',
  reviews = 'reviews',
}
