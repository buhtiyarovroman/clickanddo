import { TUser } from '@/entities/User/models'
import { TSpecialistEdit } from '../types'

export type TSpecialistUserDescriptionProps = {} & Partial<
  Pick<TUser, 'description'>
> &
  TSpecialistEdit
