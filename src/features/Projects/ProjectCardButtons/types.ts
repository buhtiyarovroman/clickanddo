import { TProject } from '@/entities/Projects/models'

export type TProjectCardButtonsProps = {
  _id?: string
  onRefresh?: () => void
} & Partial<
  Pick<
    TProject,
    | 'specialist'
    | 'status'
    | 'customerReview'
    | 'specialistReview'
    | 'owner'
    | 'name'
  >
>
