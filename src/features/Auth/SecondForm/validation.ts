import { EExecutorSecondFormFields } from '@/entities/User/store/types'
import { Schemas } from '@/shared/lib/validation/validation'
import * as z from 'zod'

export const executorSecondValidation = z.object({
  [EExecutorSecondFormFields.name]: Schemas.name,
  [EExecutorSecondFormFields.login]: Schemas.name,
  [EExecutorSecondFormFields.secondName]: Schemas.secondName,
  [EExecutorSecondFormFields.gender]: Schemas.gender,
  [EExecutorSecondFormFields.birthday]: Schemas.birthday,
  [EExecutorSecondFormFields.country]: Schemas.county,
  [EExecutorSecondFormFields.location]: z.array(z.number()),
})
