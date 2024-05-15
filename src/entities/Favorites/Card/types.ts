import { TPublication } from '@/entities/Publication/models'
import { TUser } from '@/entities/User/models'
import { TFavorite } from '../models'

export type TCardProps = {
  onDeletePress: () => void
  onMessagePress: () => void
  image: string
  hashtag: hashtag
  favorite: TPublication | TUser
} & Partial<Pick<TFavorite, 'name' | 'type'>>
