import { EFavoritesFilters } from './ui/FilterItem/types'

export type TFiltersProps = {
  filters?: EFavoritesFilters[]
  selectedFilter?: EFavoritesFilters
  setSelectedFilter?: (id: EFavoritesFilters) => void
}
