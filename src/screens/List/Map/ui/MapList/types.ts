import { TPublication } from '@/entities/Publication/models'

export type TListMapListProps = {
  getMore?: () => void
  publication?: TPublication[]
  loadMoreLoading?: boolean
  currentPublication?: string
}
