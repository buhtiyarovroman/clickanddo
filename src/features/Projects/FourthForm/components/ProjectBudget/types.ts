import { TMargin } from '@/shared/ui/utils'

export type TProjectBudgetProps = {
  value?: string
  onChangeInput?: (value: string) => void
  currency?: string
  onChangeCurrency?: (value: string) => void
  error?: string
} & TMargin
