import { CalendarProps } from 'react-native-calendars'

export type TMonthCalendarProps = {
  onSelect: (data: TCalendarValue) => void
  value: TCalendarValue
  isPeriod?: boolean
  buttonTitle?: string
} & CalendarProps

export type TCalendarValue = {
  from: string
  till: string
}
