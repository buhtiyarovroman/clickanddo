import * as z from 'zod'
import { addDays, subYears } from 'date-fns'
import { EGender } from '@/shared/ui/input/Gender/types'

export const Schemas = {
  name: z.string().min(1, { message: 'validation_error.no_empty' }),
  secondName: z
    .string()
    .min(1, { message: 'validation_error.no_empty' })
    .or(z.literal('')),
  gender: z.enum([EGender.male, EGender.female, EGender.other]),
  county: z.string().min(1, { message: 'validation_error.no_empty' }),
  birthday: z.date().max(addDays(subYears(new Date(), 16), 1), {
    message: 'validation_error.no_empty',
  }),
  city: z.string().min(1, { message: 'validation_error.no_empty' }),
  phone: z.string().min(9, { message: 'validation_error.phone' }),
  email: z.string().email({ message: 'validation_error.email' }),
  password: z.string().min(6, { message: 'validation_error.password' }),
  description: z.string().optional(),
  currency: z.enum(['UAH', 'EUR', 'PLN', 'USD']),
}
