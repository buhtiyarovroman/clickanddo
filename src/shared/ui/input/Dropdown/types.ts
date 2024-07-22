import { ValueType, DropDownDirectionType } from 'react-native-dropdown-picker'
import { StyleProp, ViewStyle } from 'react-native/types'
import { TMargin } from '../../utils'

export type TDropdownProps = {
  value: ValueType | null
  onSelect: (val: ValueType) => void
  style?: StyleProp<ViewStyle>
  items: {
    label: string
    value: string
  }[]
  label?: string
  dropDownDirection?: DropDownDirectionType

  customOpen?: boolean
  setCustomOpen?: React.Dispatch<React.SetStateAction<boolean>>
  setOtherControls?: (value: boolean) => void
} & TMargin
