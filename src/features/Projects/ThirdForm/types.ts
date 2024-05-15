import { TSchema } from '@/shared/lib/validation'
import { createProjectThirdValidation } from './validation'

export type TForm = TSchema<typeof createProjectThirdValidation>

export type TProjectsThirdFormProps = {
  pBottom?: number
  onChangeValid?: (value: boolean) => void
}

export type TProjectsThirdFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum EThirdRomFiled {
  name = 'name',
  hashtag = 'hashtag',
  description = 'description',
}
