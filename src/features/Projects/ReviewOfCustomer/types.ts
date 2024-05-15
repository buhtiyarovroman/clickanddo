import { TSchema } from '@/shared/lib/validation'
import { createReviewOfCustomerValidation } from './validation'

export type TForm = TSchema<typeof createReviewOfCustomerValidation>

export type TReviewOfCustomerBottomSheetProps = {
  project?: string
  customer?: string
  onClose?: () => void
  onRefresh?: () => void
}

export type TProjectsCreateFirstFormProps = {
  onChangeValid?: (value: boolean) => void
}

export type TProjectsCreateFirstFormRef = {
  getForm: () => Promise<TForm | null>
}

export enum EReviewOfCustomerFormFields {
  mark = 'mark',
  title = 'title',
  description = 'description',
}
