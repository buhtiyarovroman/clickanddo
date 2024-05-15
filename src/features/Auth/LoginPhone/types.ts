import { TSchema } from '@/shared/lib/validation'
import { phoneEmailValidation } from './validation'

export type TForm = TSchema<typeof phoneEmailValidation>
