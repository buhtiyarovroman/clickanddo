import { TUser } from '@/entities/User/models'
import { TSpecialistEdit } from '../types'
import { TUserRenderPublicationProps } from '../RenderPublication/types'

export type TUserSpecialistPublicationsProps = {
  disableTitle?: boolean
} & TSpecialistEdit &
  Partial<Pick<TUser, '_id'>> &
  Pick<TUserRenderPublicationProps, 'hideIfEmpty' | 'title' | 'onNavigatePress'>
