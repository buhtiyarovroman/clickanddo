import { Schemas } from '@/shared/lib/validation'
import * as z from 'zod'

export type TCurrencyBottomSheetProps = {
  currency: TCurrencyValue
  onChange?: (value: TCurrencyValue) => void
  onClose?: () => void
}

export type TCurrencyData = {
  title: string
  value: TCurrencyValue
}

export type TCurrencyValue = z.infer<typeof Schemas.currency>
