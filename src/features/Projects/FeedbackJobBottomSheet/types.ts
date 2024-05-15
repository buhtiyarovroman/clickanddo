import { TSchema } from '@/shared/lib/validation'
import { feedbackJobValidation } from './validation'

export type TFeedbackJobBottomSheetProps = {
  _id: string
  onClose?: () => void
}

export type TForm = TSchema<typeof feedbackJobValidation>

export enum TFeedbackJobField {
  title = 'title',
  description = 'description',
  price = 'price',
  currency = 'currency',
}
