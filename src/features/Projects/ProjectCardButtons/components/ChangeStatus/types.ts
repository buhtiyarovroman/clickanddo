import { TProject } from '@/entities/Projects/models'

export type TProjectCardButtonsChangeStatusProps = {
  isCustomer?: boolean
  isProgressStatus?: boolean
  isMarkDoneStatus?: boolean
  onRefresh?: () => void
  onOpenReview?: () => void
  isPendingSpecialistStatus?: boolean
} & Partial<Pick<TProject, 'specialist' | '_id' | 'origin'>>
