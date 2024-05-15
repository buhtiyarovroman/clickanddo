import { z as x } from 'zod'
import { EEducationFormFields } from './types'

export const createChangeLanguagesValid = x.object({
  [EEducationFormFields.education]: x
    .array(
      x.object({
        id: x.string(),
        name: x.string().min(1, { message: 'validation_error.no_empty' }),
        from: x.string().min(1, { message: 'validation_error.no_empty' }),
        to: x.string().or(x.literal('')),
        discipline: x.string().min(1, { message: 'validation_error.no_empty' }),
        location: x.string().min(1, { message: 'validation_error.no_empty' }),
      }),
    )
    .min(1, { message: 'no empty' }),
})
