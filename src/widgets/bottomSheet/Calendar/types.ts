import { TCalendarValue } from '@/shared/ui/MonthCalendar/types'

export type TCalendarBBottomSheetProps = {
  value?: TCalendarValue
  onSelect?: (value: TCalendarValue) => void
}
