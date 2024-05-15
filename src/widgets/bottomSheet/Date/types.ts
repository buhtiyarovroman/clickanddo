import { DatePickerProps } from 'react-native-date-picker'

export type TDateBottomSheetProps = {
  dateValue?: Date
  setDate?: (value: Date) => void
  pickerProps?: Partial<DatePickerProps>
  maximumDate?: Date
  minimumDate?: Date
  locale?: string
  mode?: 'date' | 'time'
}
