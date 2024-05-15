import { TProject } from '@/entities/Projects/models'

export type TFeedbackButtonProps = {
  _id?: string
  onRefresh?: () => void
} & Partial<
  Pick<
    TProject,
    'projectResponses' | 'specialist' | 'owner' | 'name' | 'status'
  >
>
