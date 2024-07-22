import { TSchema } from '@/shared/lib/validation'
import { createProjectInfoFormValidation } from './validation'

export type TForm = TSchema<typeof createProjectInfoFormValidation>

export type TProjectInfoFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TProjectInfoFormRef = {
  getForm: () => Promise<TForm | null>
}
