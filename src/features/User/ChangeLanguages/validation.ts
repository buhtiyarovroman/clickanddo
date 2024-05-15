import { z } from 'zod'
import { EChangeLangFormFields } from './types'

export const createChangeLanguagesValid = z.object({
  [EChangeLangFormFields.lang]: z
    .array(
      z.object({
        id: z.string(),
        lang: z.string().min(1, { message: 'validation_error.no_empty' }),
        level: z.number().min(1, { message: 'validation_error.no_empty' }),
      }),
    )
    .min(1, { message: 'no empty' }),
})
