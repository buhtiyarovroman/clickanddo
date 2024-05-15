import { TSchema } from '@/shared/lib/validation'
import { createSpecialOfferSecondValidation } from './validation'

export type TForm = TSchema<typeof createSpecialOfferSecondValidation>

export type TSpecialOfferSecondFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TSpecialOfferCreateSecondFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum ESpecialOfferCreateSecondFormFields {
  priceFrom = 'priceFrom',
  currency = 'currency',
  priceTo = 'priceTo',
  duration = 'duration',
  expirationDate = 'expirationDate',
}
