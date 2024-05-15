import { Schemas } from '@/shared/lib/validation/validation'
import { EExecutorFirstFormFields } from './types'
import * as z from 'zod'

export const executorFirstValidation = z.object({
  [EExecutorFirstFormFields.phone]: Schemas.phone,
  [EExecutorFirstFormFields.email]: Schemas.email,
  [EExecutorFirstFormFields.password]: Schemas.phone,
})
