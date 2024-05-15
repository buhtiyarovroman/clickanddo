import { z } from 'zod'
import { EProjectCreateFirstFormFields } from './types'
import { t } from 'i18next'

export const createProjectFirstValidation = z.object({
  [EProjectCreateFirstFormFields.name]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') })
    .max(100, { message: t('validation_error.max_length', { value: 100 }) }),
})
