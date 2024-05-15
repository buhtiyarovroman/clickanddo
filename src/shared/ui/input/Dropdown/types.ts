import { ValueType, DropDownDirectionType } from 'react-native-dropdown-picker'
import { TMargin } from '../../utils'

export type TDropdownProps = {
  value: ValueType | null
  onSelect: (val: ValueType) => void

  items: {
    label: string
    value: string
  }[]
  label?: string
  dropDownDirection?: DropDownDirectionType
} & TMargin
