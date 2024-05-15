import { TSchema } from '@/shared/lib/validation'
import { createReviewOfSpecialistValidation } from './validation'

export type TForm = TSchema<typeof createReviewOfSpecialistValidation>

export type TReviewOfSpecialistBottomSheetProps = {
  project?: string
  specialist?: string
  onClose?: () => void
  onRefresh?: () => void
}

export type TProjectsCreateFirstFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TProjectsCreateFirstFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum EReviewOfSpecialistFormFields {
  price = 'price',
  professionalism = 'professionalism',
  cost = 'cost',
  contactability = 'contactability',
  timing = 'timing',
  title = 'title',
  text = 'text',
}
