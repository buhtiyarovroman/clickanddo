import { TSchema } from '@/shared/lib/validation'
import { executorSecondValidation } from './validation'

export type TForm = TSchema<typeof executorSecondValidation>

export type TSecondFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TGetFormProps = TForm

export type TSecondFormRef = {
  getForm: () => Promise<TGetFormProps | null>
}
