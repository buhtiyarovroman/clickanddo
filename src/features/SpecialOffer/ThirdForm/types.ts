import { TSchema } from '@/shared/lib/validation'
import { createSpecialOfferThirdValidation } from './validation'

export type TForm = TSchema<typeof createSpecialOfferThirdValidation>

export enum ESpecialOfferCreateThirdFormFields {
  photos = 'photos',
}

export type TSpecialOfferThirdFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TSpecialOfferCreateThirdFormRef = {
  getForm: () => Promise<TForm | null>
}
