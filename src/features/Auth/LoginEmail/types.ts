import { TSchema } from '@/shared/lib/validation'
import { loginEmailValidation } from './validation'

export type TForm = TSchema<typeof loginEmailValidation>
