import { z } from 'zod'
import { t } from 'i18next'

import { ESkillBoxCreateFirstFormFields } from './types'
import { Schemas } from '@/shared/lib/validation'

export const createSkillBoxFirstValidation = z.object({
  [ESkillBoxCreateFirstFormFields.title]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
  [ESkillBoxCreateFirstFormFields.tags]: Schemas.hashtags.min(1, {
    message: t('validation_error.no_empty'),
  }),
  [ESkillBoxCreateFirstFormFields.photos]: z
    .array(
      z.object({
        id: z.string(),
        path: z.string(),
      }),
    )
    .min(1, { message: t('validation_error.no_empty') }),
  [ESkillBoxCreateFirstFormFields.hideLikes]: z.boolean(),
})
