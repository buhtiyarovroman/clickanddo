import { TSchema } from '@/shared/lib/validation'
import { createSpecialOfferFourthValidation } from './validation'

export type TForm = TSchema<typeof createSpecialOfferFourthValidation>

export type TSpecialOfferFourthFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TSpecialOfferCreateFourthFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum ESpecialOfferCreateFourthFormFields {
  description = 'description',
}
