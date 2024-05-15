import { z } from 'zod'
import { t } from 'i18next'
import { Schemas } from '@/shared/lib/validation'

export const createProjectFourthFormValidation = z.object({
  location: z.array(z.number()).optional(),
  startDate: z
    .string()
    .min(1, { message: t('validation_error.no_empty') })
    .optional()
    .or(z.literal('')),
  endDate: z
    .string()
    .min(1, { message: t('validation_error.no_empty') })
    .optional()
    .or(z.literal('')),
  relevantUntil: z
    .string()
    .min(1, { message: t('validation_error.no_empty') })
    .optional()
    .or(z.literal('')),
  currency: Schemas.currency,
  address: z.string(),
  budget: z.number(),
})
