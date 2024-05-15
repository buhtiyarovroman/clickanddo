import { TProject } from '../models'

export type TProjectPreviewMainProps = {
  isCreate?: boolean
  onGoProfile?: (id: string) => void
} & Partial<
  Pick<
    TProject,
    'name' | 'description' | 'hashtag' | 'owner' | 'budget' | 'currency'
  >
>
