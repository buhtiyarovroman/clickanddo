import { TPredictionPlace } from '@/entities/User/models'

export type TLocationPlaceItemProps = {
  place?: TPredictionPlace
  onPress?: (value: string, address: string) => void
}
