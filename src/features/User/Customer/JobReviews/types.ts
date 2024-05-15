import { TUser } from '@/entities/User/models'
import { TSpecialistEdit } from '../../Specialist/types'

export type TSpecialistUserJobReviewsProps = {} & TSpecialistEdit &
  Partial<Pick<TUser, '_id' | 'about'>>

export enum ECReviewTabs {
  Projects = 'Projects',
  Description = 'Description',
  Reviews = 'Reviews',
}
