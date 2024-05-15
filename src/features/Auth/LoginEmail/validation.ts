import { Schemas } from '@/shared/lib/validation/validation'
import * as z from 'zod'

export const loginEmailValidation = z.object({
  email: Schemas.email,
})
