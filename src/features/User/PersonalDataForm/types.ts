import { TSchema } from '@/shared/lib/validation'
import { personalDataValidation } from './validation'

export type TPersonalDataForm = TSchema<typeof personalDataValidation>

export type TPersonalDataFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TGetPersonalDataFormProps = TPersonalDataForm

export type TPersonalDataFormRef = {
  getForm: () => Promise<TGetPersonalDataFormProps | null>
}

export enum EPersonalDataFormFields {
  name = 'name',
  location = 'location',
  email = 'email',
  phone = 'phone',
}
