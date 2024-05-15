import { TTranslateValue } from '@/entities/Category/models'
import { TSchema } from '@/shared/lib/validation'
import { createSkillBoxFirstValidation } from './validation'

export type TForm = TSchema<typeof createSkillBoxFirstValidation>

export type TSkillBoxFirstFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TSkillBoxCreateFirstFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum ESkillBoxCreateFirstFormFields {
  title = 'title',
  tags = 'tags',
  photos = 'photos',
  hideLikes = 'hideLikes',
}

export type TCategoryValue = { title: TTranslateValue[] }
