import { Schemas } from '@/shared/lib/validation/validation'
import * as z from 'zod'
import { EPersonalDataFormFields } from './types'
import auth from '@react-native-firebase/auth'
import { t } from 'i18next'

export const personalDataValidation = z.object({
  // [EPersonalDataFormFields.email]: Schemas.email
  //   .optional()
  //   .or(z.literal(''))
  //   .refine(filed => (auth().currentUser?.email ? !!filed?.length : true), {
  //     message: t('validation_error.email'),
  //   }),
  [EPersonalDataFormFields.phone]: Schemas.phone
    .optional()
    .or(z.literal(''))
    .refine(
      filed => (auth().currentUser?.phoneNumber ? !!filed?.length : true),
      {
        message: t('validation_error.phone'),
      },
    ),
  [EPersonalDataFormFields.email]: Schemas.email.optional().or(z.literal('')),
  [EPersonalDataFormFields.name]: Schemas.name.optional().or(z.literal('')),
  [EPersonalDataFormFields.location]: Schemas.name.optional().or(z.literal('')),
})
