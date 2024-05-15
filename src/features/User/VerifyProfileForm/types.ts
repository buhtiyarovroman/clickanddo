import { TSchema } from '@/shared/lib/validation'
import { createVerifyProfileLanguagesValid } from './validation'

export type TForm = TSchema<typeof createVerifyProfileLanguagesValid>

export type TVerifyProfileFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TVerifyProfileFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum EChangeLangFormFields {
  series = 'series',
  no = 'no',
  id = 'id',
  photo = 'photo',
  agree = 'agree',
}
