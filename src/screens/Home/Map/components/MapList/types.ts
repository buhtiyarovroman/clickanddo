import { TProject } from '@/entities/Projects/models'
import { TUser } from '@/entities/User/models'

export type TMapListProps = {
  index?: number
  setIndex?: (index: number) => void
  data?: TUser[] | TProject[]
  onShowMyLocation?: () => void
}
