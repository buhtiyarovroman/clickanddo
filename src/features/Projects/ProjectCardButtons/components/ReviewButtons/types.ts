import { TProject } from '@/entities/Projects/models'

export type TProjectCardButtonsReviewButtonsProps = {
  isCustomer?: boolean
  isDoneStatus?: boolean
  onRefresh?: () => void
  isProgressStatus?: boolean
  isMarkDoneStatus?: boolean
  isPendingSpecialistStatus?: boolean
} & Partial<
  Pick<
    TProject,
    | 'specialistReview'
    | 'specialist'
    | 'owner'
    | 'customerReview'
    | '_id'
    | 'origin'
  >
>
