import { TTranslateValue } from '@/entities/Category/models'
import { TSchema } from '@/shared/lib/validation'
import { createSkillBoxThirdValidation } from './validation'

export type TForm = TSchema<typeof createSkillBoxThirdValidation>

export type TSkillBoxThirdFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TSkillBoxCreateThirdFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum ESkillBoxCreateThirdFormFields {
  description = 'description',
  duration = 'duration',
}

export type TCategoryValue = { title: TTranslateValue[] }

export type TImagePathWithId = { id: string; path: string }
