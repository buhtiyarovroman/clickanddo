import { TListFilterData } from '@/entities/Publication/models'

export type TListProps = {
  filterData?: TListFilterData
}

export enum ESortType {
  date = 'createdAt',
  rating = 'likes',
  activity = 'favorites',
}
