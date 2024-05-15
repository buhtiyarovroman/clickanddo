import { z } from 'zod'
import { EChangeLangFormFields } from './types'

export const createVerifyProfileLanguagesValid = z.object({
  [EChangeLangFormFields.series]: z
    .string()
    .min(1, { message: 'validation_error.no_empty' }),
  [EChangeLangFormFields.no]: z
    .string()
    .min(1, { message: 'validation_error.no_empty' }),
  [EChangeLangFormFields.id]: z
    .string()
    .min(1, { message: 'validation_error.no_empty' }),
  [EChangeLangFormFields.photo]: z
    .string()
    .min(1, { message: 'validation_error.no_empty' }),
  [EChangeLangFormFields.agree]: z
    .boolean()
    .refine(item => !!item, { message: 'Require' }),
})
