import { TSchema } from '@/shared/lib/validation'
import { accountDataFormValidation } from './validation'

export type TForm = TSchema<typeof accountDataFormValidation>

export type TAccountDataFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TGetFormProps = TForm

export type TAccountDataFormRef = {
  getForm: () => Promise<TGetFormProps | null>
}

export enum EAccountDataFormFields {
  name = 'name',
  secondName = 'secondName',
  email = 'email',
  login = 'login',
  phone = 'phone',
  location = 'location',
  coordinates = 'coordinates',
  description = 'description',
}
