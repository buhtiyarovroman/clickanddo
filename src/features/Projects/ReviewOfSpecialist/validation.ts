import { z } from 'zod'
import { EReviewOfSpecialistFormFields } from './types'
import { t } from 'i18next'

export const createReviewOfSpecialistValidation = z.object({
  [EReviewOfSpecialistFormFields.price]: z
    .number()
    .min(1, { message: t('validation_error.choose_grade') }),
  [EReviewOfSpecialistFormFields.professionalism]: z
    .number()
    .min(1, { message: t('validation_error.choose_grade') }),
  [EReviewOfSpecialistFormFields.cost]: z
    .number()
    .min(1, { message: t('validation_error.choose_grade') }),
  [EReviewOfSpecialistFormFields.contactability]: z
    .number()
    .min(1, { message: t('validation_error.choose_grade') }),
  [EReviewOfSpecialistFormFields.timing]: z
    .number()
    .min(1, { message: t('validation_error.choose_grade') }),
  [EReviewOfSpecialistFormFields.title]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
  [EReviewOfSpecialistFormFields.text]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
})
