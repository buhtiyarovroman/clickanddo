import { EDateValue } from '../../types'

export type TDateValueItemProps = {
  type?: EDateValue
  onPress?: (value: EDateValue) => void
  isSelected?: boolean
}
