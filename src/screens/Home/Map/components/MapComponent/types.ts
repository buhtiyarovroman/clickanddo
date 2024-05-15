import { TUser } from '@/entities/User/models'
import { TCenterLocation } from '../../types'
import { TProject } from '@/entities/Projects/models'

export type TMapComponentProps = {
  center: TCenterLocation
  setCenter?: (value: TCenterLocation) => void
  currentIndex?: number
  setCurrentIndex?: (value: number) => void
  data?: TUser[] | TProject[]
  myPosition?: Partial<Pick<TCenterLocation, 'latitude' | 'longitude'>>
}
