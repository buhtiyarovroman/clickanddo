import { TSchema } from '@/shared/lib/validation'
import { createProjectFirstValidation } from './validation'

export type TForm = TSchema<typeof createProjectFirstValidation>

export type TProjectsSecondFormProps = {
  pBottom?: number
  onChangeValid?: (value: boolean) => void
  isEdit?: boolean
}

export type TProjectsSecondFormRef = {
  getForm: () => Promise<TForm | null>
}
