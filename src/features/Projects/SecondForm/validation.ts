import { z } from 'zod'
import { t } from 'i18next'

export const createProjectFirstValidation = z.object({
  description: z
    .string()
    .min(1, { message: t('validation_error.no_empty') })
    .max(3000, { message: t('validation_error.max_length', { value: 3000 }) }),
  images: z.array(
    z.object({
      id: z.string(),
      path: z.string(),
    }),
  ),
  hashtag: z
    .array(z.any())
    .min(1, { message: t('validation_error.no_empty') })
    .max(20, { message: 'too lagre' }),
})
