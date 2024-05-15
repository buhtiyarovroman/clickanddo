import { TUser } from '@/entities/User/models'
import { TSpecialistEdit } from '../types'

export type TUserSpecialistSkillsProps = {} & TSpecialistEdit &
  Partial<Pick<TUser, 'hashtag'>>
