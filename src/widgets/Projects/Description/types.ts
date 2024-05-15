import { TProject } from '@/entities/Projects/models'

export type TProjectPreviewProps = {
  onRefresh?: () => void
  onGoProfile?: (id: string) => void
  project?: TProject | null
}
