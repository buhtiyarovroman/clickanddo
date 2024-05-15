import { SetStateAction } from 'react'

import { TProjectCartProps } from '../../types'
import { TProject } from '@/entities/Projects/models'

export type TProjectCardHeadProps = {
  project?: TProject
  setProjects?: React.Dispatch<SetStateAction<TProject[]>>
} & Pick<TProjectCartProps, 'type' | 'showDates' | 'hideCreatedAt'>
