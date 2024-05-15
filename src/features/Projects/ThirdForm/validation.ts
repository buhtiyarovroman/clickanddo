import { z } from 'zod'
import { t } from 'i18next'
import { EThirdRomFiled } from './types'

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
  [EThirdRomFiled.hashtag]: z
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
    .optional(),
})
