import { EPublicationType } from '@/entities/Publication/models'
import { TSpecialistEdit } from '../types'
import { TIconsKeys } from '@assets/Svg'

export type TUserRenderPublicationProps = {
  title?: string
  type?: `${EPublicationType}`
  emptyText?: string
  emptyIcon?: TIconsKeys
  onEditPress?: () => void
  onAddPress?: () => void
  ownerId?: string
  hideIfEmpty?: boolean
  onNavigatePress?: () => void
} & TSpecialistEdit
