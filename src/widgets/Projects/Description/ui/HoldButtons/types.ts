import { TProject } from '@/entities/Projects/models'

export type THoldButtonsProps = {
  project?: TProject | null
  onRefresh?: () => void
}
