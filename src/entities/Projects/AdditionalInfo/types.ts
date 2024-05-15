import { TProject } from '../models'

export type TProjectPreviewAdditionalInfoProps = {} & Partial<
  Pick<TProject, 'startDate' | 'endDate' | 'relevantUntil' | 'address'>
>
