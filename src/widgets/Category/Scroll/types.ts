import { TInterest } from '@/entities/Interests/models/common'
export type TCategoriesScrollProps = {
  interests: TInterest[]
  onEndReached: () => void
  openFilters: () => void
  loading: boolean
  selectedInterest: string[]
  setSelectedInterest: (id: string) => void
}
