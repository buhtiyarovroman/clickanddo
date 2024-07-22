import { z } from 'zod'
import { t } from 'i18next'
import { EThirdRomFiled } from './types'
import { Schemas } from '@/shared/lib/validation'

export const createProjectThirdValidation = z.object({
  [EThirdRomFiled.name]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') })
    .optional()
    .or(z.literal('')),
  [EThirdRomFiled.description]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') })
    .optional()
    .or(z.literal('')),
  [EThirdRomFiled.hashtag]: Schemas.hashtags.optional(),
})
