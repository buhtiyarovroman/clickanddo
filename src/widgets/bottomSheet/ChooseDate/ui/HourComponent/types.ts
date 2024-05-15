import { TMargin } from '@/shared/ui/utils'

export type THourComponentProps = {
  date?: Date
  onSelect?: (value: Date) => void
} & Partial<TStyledHourComponentProps>

export type TStyledHourComponentProps = {
  active: boolean
  disable: boolean
} & TMargin
