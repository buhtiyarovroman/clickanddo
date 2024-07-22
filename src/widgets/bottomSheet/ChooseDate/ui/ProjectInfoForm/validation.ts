import { z } from 'zod'
import { Schemas } from '@/shared/lib/validation'
import { t } from 'i18next'

export const createProjectInfoFormValidation = z.object({
  name: z
    .string()
    .min(1, { message: t('validation_error.no_empty') })
    .max(100, { message: t('validation_error.max_length', { value: 100 }) }),
  location: z.array(z.number()).optional(),
  currency: Schemas.currency,
  address: z.string(),
  budget: z.number(),
  description: z
    .string()
    .min(1, { message: t('validation_error.no_empty') })
    .max(3000, { message: t('validation_error.max_length', { value: 3000 }) }),
})
