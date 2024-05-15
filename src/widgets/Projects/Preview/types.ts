import { TCreateProjectData } from '@/entities/Projects/store/types'

export type TProjectPreviewProps = {
  onSuccess?: (value: boolean, isSpec: boolean) => void
} & Partial<TCreateProjectData>
