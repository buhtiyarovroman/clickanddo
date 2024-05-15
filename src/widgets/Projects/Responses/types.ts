import { TProject } from '@/entities/Projects/models'

export type TProjectResponsesListProps = { onRefresh?: () => void } & Partial<
  Pick<TProject, 'projectResponses' | '_id' | 'specialist'>
>
