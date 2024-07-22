import { Schemas } from '@/shared/lib/validation/validation'
import * as z from 'zod'
import { EAccountDataFormFields } from './types'

export const accountDataFormValidation = z.object({
  [EAccountDataFormFields.name]: Schemas.name,
  [EAccountDataFormFields.secondName]: Schemas.secondName,
  [EAccountDataFormFields.email]: Schemas.email,
  [EAccountDataFormFields.login]: Schemas.name,
  [EAccountDataFormFields.phone]: Schemas.phone,
  [EAccountDataFormFields.location]: Schemas.name,
  [EAccountDataFormFields.coordinates]: z
    .array(z.number())
    .min(1, { message: 'validation_error.coordinates' }),
  [EAccountDataFormFields.description]: Schemas.description,
})
