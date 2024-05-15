import { TSchema } from '@/shared/lib/validation'
import { createProjectFourthFormValidation } from './validation'

export type TForm = TSchema<typeof createProjectFourthFormValidation>

export type TProjectsFourthFormProps = {
  onChangeValid?: (value: boolean) => void
  pBottom: number
}

export type TFourthCreateProjectData = TForm

export type TProjectsFourthFormRef = {
  getForm: () => Promise<TFourthCreateProjectData | null>
}
