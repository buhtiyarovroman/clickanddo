import { TProjectResponse } from '@/entities/Projects/models'

export type TResponseCardButtonsProps = {
  onRefresh?: () => void
} & Partial<Pick<TProjectResponse, '_id' | 'specialist'>>
