import { TMargin } from '@/shared/ui/utils'
import { EProjectCardType } from '@/widgets/Projects/ProjectCard/types'

export type TTabComponentProps = {
  list?: EProjectCardType[]
  activeType?: EProjectCardType

  setType?: (value: EProjectCardType) => void
} & TMargin
