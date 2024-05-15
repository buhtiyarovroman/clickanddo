import { z } from 'zod'
import { t } from 'i18next'

import { ESkillBoxCreateFirstFormFields } from './types'

export const createSkillBoxFirstValidation = z.object({
  [ESkillBoxCreateFirstFormFields.title]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
  [ESkillBoxCreateFirstFormFields.tags]: z
    .array(
      z.object({
        _id: z.string(),
        title: z.array(
          z.object({
            lang: z.string(),
            value: z.string(),
          }),
        ),
      }),
    )
    .min(1, { message: t('validation_error.no_empty') }),
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
