import { TTranslateValue } from '@/entities/Category/models'
import { TSchema } from '@/shared/lib/validation'
import { createSkillBoxSecondValidation } from './validation'

export type TForm = TSchema<typeof createSkillBoxSecondValidation>

export type TSkillBoxSecondFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TSkillBoxCreateSecondFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum ESkillBoxCreateSecondFormFields {
  location = 'location',
  locationRange = 'locationRange',
  address = 'address',
}

export type TCategoryValue = { title: TTranslateValue[] }

export type TImagePathWithId = { id: string; path: string }
