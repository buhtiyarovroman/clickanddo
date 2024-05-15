import { TTranslateValue } from '@/entities/Category/models'
import { TSchema } from '@/shared/lib/validation'
import { createSkillBoxFourthValidation } from './validation'

export type TForm = TSchema<typeof createSkillBoxFourthValidation>

export type TSkillBoxFourthFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TSkillBoxCreateFourthFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum ESkillBoxCreateFourthFormFields {
  initialPrice = 'initialPrice',
  discount = 'discount',
  priceAfterDiscount = 'priceAfterDiscount',
  currency = 'currency',
  totalPrice = 'totalPrice',
}

export type TCategoryValue = { title: TTranslateValue[] }

export type TImagePathWithId = { id: string; path: string }
