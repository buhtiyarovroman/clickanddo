import { z as x } from 'zod'
import { EEducationFormFields } from './types'

export const createWorkValid = x.object({
  [EEducationFormFields.works]: x
    .array(
      x.object({
        id: x.string(),
        nameOfCompany: x
          .string()
          .min(1, { message: 'validation_error.no_empty' }),
        companyLocation: x
          .string()
          .min(1, { message: 'validation_error.no_empty' }),
        from: x.string().min(1, { message: 'validation_error.no_empty' }),
        to: x.string().optional().or(x.literal('')),
      }),
    )
    .min(1, { message: 'no empty' }),
})
