import { z } from 'zod'
import { t } from 'i18next'

import { ESkillBoxCreateFourthFormFields } from './types'
import { Schemas } from '@/shared/lib/validation'

export const createSkillBoxFourthValidation = z.object({
  [ESkillBoxCreateFourthFormFields.initialPrice]: z
    .number()
    .min(0, { message: t('validation_error.no_empty') }),
  [ESkillBoxCreateFourthFormFields.discount]: z
    .number()
    .max(99, { message: t('validation_error.discount_max') })
    .optional(),
  [ESkillBoxCreateFourthFormFields.priceAfterDiscount]: z
    .number()
    .min(0, { message: t('validation_error.no_empty') }),
  [ESkillBoxCreateFourthFormFields.currency]: Schemas.currency,
  [ESkillBoxCreateFourthFormFields.totalPrice]: z
    .number()
    .min(0, { message: t('validation_error.no_empty') }),
})
