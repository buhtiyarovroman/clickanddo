import { TSchema } from '@/shared/lib/validation'
import { createProjectPersonalFormValidation } from './validation'

export type TForm = TSchema<typeof createProjectPersonalFormValidation>

export type TProjectsCreatePersonalFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TProjectsCreatePersonalFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum EProjectCreatePersonalFormFields {
  name = 'name',
  description = 'description',
  images = 'images',
  address = 'address',
  location = 'location',
  startDate = 'startDate',
  budget = 'budget',
  currency = 'currency'
}
