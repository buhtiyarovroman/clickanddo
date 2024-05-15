import { Schemas } from '@/shared/lib/validation/validation'
import * as z from 'zod'

export const phoneEmailValidation = z.object({
  phone: Schemas.phone,
})
