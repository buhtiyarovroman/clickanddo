import { TProjectResponse } from '@/entities/Projects/models'
import { TResponseCardProps } from '../../types'

export type TResponseCardHeadProps = {} & Partial<
  Pick<
    TProjectResponse,
    'name' | 'secondName' | 'title' | 'date' | 'photo' | 'specialist'
  >
> &
  Partial<Pick<TResponseCardProps, 'disableDate' | 'onPressUser'>>
