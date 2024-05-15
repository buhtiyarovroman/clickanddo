import { TMargin } from '@/shared/ui/utils'

export type TDateComponentsProps = {
  date?: Date
  onSelect?: (value: Date) => void
} & Partial<TStyledDateComponentsProps>

export type TStyledDateComponentsProps = {
  active: boolean
} & TMargin
