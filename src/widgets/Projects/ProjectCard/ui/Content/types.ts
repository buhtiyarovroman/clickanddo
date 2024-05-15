import { TProject } from '@/entities/Projects/models'
import { TProjectCartProps } from '../../types'

export type TProjectCardContentProps = {
  onRefresh?: () => void
} & Partial<
  Pick<
    TProject,
    | 'specialist'
    | 'status'
    | 'customerReview'
    | 'specialistReview'
    | 'owner'
    | 'projectResponses'
    | 'views'
    | 'address'
  >
> &
  Partial<Pick<TProjectCartProps, 'disableButtons' | 'type'>>
