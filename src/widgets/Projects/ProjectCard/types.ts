import { TProject } from '@/entities/Projects/models'
import { TMargin } from '@/shared/ui/utils'
import { SetStateAction } from 'react'

export type TProjectCartProps = {
  onPress?: () => void
  type?: TProjectCartType
  onRefresh?: () => void
  width?: string
  disableButtons?: boolean
  project: TProject
  setProjects?: React.Dispatch<SetStateAction<TProject[]>>
  showDates?: boolean
  showStatus?: boolean
  hideCreatedAt?: boolean
} & TMargin

export type TProjectCartType = EProjectCardType

export enum EProjectTypes {
  searching = 'searching',
  in_progress = 'in-progress',
  mark_done = 'mark-done',
  done = 'done',
  hold = 'hold',
  pending_specialist = 'pending-specialist',
  canceled = 'canceled',
  canceled_by_owner = 'canceled-by-owner',
  rejected_by_specialist = 'rejected-by-specialist',
}

export enum EProjectCardType {
  requisitions = 'requisitions',
  active = 'active',
  graft = 'draft',
  completed = 'completed',
  in_progress = 'in_progress',
}
