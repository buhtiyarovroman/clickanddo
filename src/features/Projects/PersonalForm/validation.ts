import { z } from 'zod'
import { EProjectCreatePersonalFormFields } from './types'
import { t } from 'i18next'
import { Schemas } from '@/shared/lib/validation'

export const createProjectPersonalFormValidation = z.object({
  [EProjectCreatePersonalFormFields.name]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') })
    .max(100, { message: t('validation_error.max_length', { value: 100 }) }),
  [EProjectCreatePersonalFormFields.description]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') })
    .max(3000, { message: t('validation_error.max_length', { value: 3000 }) }),
  [EProjectCreatePersonalFormFields.location]: z.array(z.number()).optional(),
  [EProjectCreatePersonalFormFields.address]: z.string(),
  [EProjectCreatePersonalFormFields.startDate]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') })
    .optional()
    .or(z.literal('')),
  [EProjectCreatePersonalFormFields.budget]: z.number(),
  [EProjectCreatePersonalFormFields.currency]: Schemas.currency,
  [EProjectCreatePersonalFormFields.images]: z.array(
    z.object({
      id: z.string(),
      path: z.string(),
    }),
  ),
})
