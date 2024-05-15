import { TProject } from '@/entities/Projects/models'

export type TProjectCardStatusesProps = {} & Partial<
  Pick<
    TProject,
    'originType' | 'relevantUntil' | 'status' | 'specialist' | 'startDate'
  >
>
