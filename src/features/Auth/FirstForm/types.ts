import { TSchema } from '@/shared/lib/validation'
import { executorFirstValidation } from './validation'

export type TForm = TSchema<typeof executorFirstValidation>

export type TExecutorFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TGetFormProps = { countryCode: string } & TForm

export type TExecutorFormRef = {
  getForm: () => Promise<TGetFormProps | null>
}

export enum EExecutorFirstFormFields {
  phone = 'phone',
  email = 'email',
  password = 'password',
}
