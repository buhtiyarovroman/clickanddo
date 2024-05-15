import { TSchema } from '@/shared/lib/validation'
import { createWorkValid } from './validation'

export type TForm = TSchema<typeof createWorkValid>

export type TWorkFormProps = {
  // onChangeValid?: (value: boolean) => void
  isEdit?: boolean
}

export type TWorkFormData = TForm

export type TWorkFormRef = {
  getForm: () => Promise<TWorkFormData | null>
}

export enum EEducationFormFields {
  works = 'works',
}
