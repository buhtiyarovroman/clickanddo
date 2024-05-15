import { TMargin } from '@/shared/ui/utils'

export type TPassportPhoto = {
  value: string
  onChange: (value: string) => void
  error?: string
} & TMargin
