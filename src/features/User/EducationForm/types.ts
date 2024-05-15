import { TSchema } from '@/shared/lib/validation'
import { createChangeLanguagesValid } from './validation'

export type TForm = TSchema<typeof createChangeLanguagesValid>

export type TEducationFormProps = {
  isEdit?: boolean
}

export type TEducationFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum EEducationFormFields {
  education = 'education',
}
