import { TSchema } from '@/shared/lib/validation'
import { createChangeLanguagesValid } from './validation'

export type TForm = TSchema<typeof createChangeLanguagesValid>

export type TChangeLangFormProps = {
  // onChangeValid?: (value: boolean) => void
  isEdit?: boolean
  pBottom?: number
}

export type TChangeLangFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum EChangeLangFormFields {
  lang = 'lang',
}
