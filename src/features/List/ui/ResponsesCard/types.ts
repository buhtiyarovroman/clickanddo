import { TProject } from '@/entities/Projects/models'
import { TMargin } from '@/shared/ui/utils'

export type TPublicationResponseCardProps = {
  disableButtons?: boolean
  onRefresh?: () => void
  onAddCount?: React.Dispatch<React.SetStateAction<number>>
} & Partial<Pick<TProject, '_id' | 'name' | 'owner' | 'startDate' | 'status'>> &
  TMargin
