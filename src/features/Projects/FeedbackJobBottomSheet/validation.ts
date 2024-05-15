import { Schemas } from '@/shared/lib/validation'
import * as z from 'zod'
import { TFeedbackJobField } from './types'

export const feedbackJobValidation = z.object({
  [TFeedbackJobField.title]: Schemas.name,
  [TFeedbackJobField.description]: Schemas.name,
  [TFeedbackJobField.currency]: Schemas.currency,
  [TFeedbackJobField.price]: z.number(),
})
