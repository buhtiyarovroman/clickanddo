import { TTranslateValue } from '@/entities/Category/models'
import { TSchema } from '@/shared/lib/validation'
import { createSpecialOfferFirstValidation } from './validation'

export type TForm = TSchema<typeof createSpecialOfferFirstValidation>

export type TSpecialOfferFirstFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TSpecialOfferCreateFirstFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum ESpecialOfferCreateFirstFormFields {
  title = 'title',
  tags = 'tags',
  address = 'address',
  hideLikes = 'hideLikes',
}

export type TCategoryValue = { title: TTranslateValue[] }
