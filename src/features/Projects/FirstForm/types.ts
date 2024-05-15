import { TSchema } from '@/shared/lib/validation'
import { createProjectFirstValidation } from './validation'

export type TForm = TSchema<typeof createProjectFirstValidation>

export type TProjectsCreateFirstFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TProjectsCreateFirstFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum EProjectCreateFirstFormFields {
  name = 'name',
}
