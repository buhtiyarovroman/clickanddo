import { z } from 'zod'
import { EReviewOfCustomerFormFields } from './types'
import { t } from 'i18next'

export const createReviewOfCustomerValidation = z.object({
  [EReviewOfCustomerFormFields.mark]: z
    .number()
    .min(1, { message: t('validation_error.choose_grade') }),
  [EReviewOfCustomerFormFields.title]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
  [EReviewOfCustomerFormFields.description]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
})
