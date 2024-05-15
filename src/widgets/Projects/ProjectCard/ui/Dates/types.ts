import { TProject } from '@/entities/Projects/models'

export type TProjectCardDatesProps = {} & Partial<
  Pick<TProject, 'budget' | 'relevantUntil'>
>
