import { z } from 'zod'
import { t } from 'i18next'

import { ESpecialOfferCreateFourthFormFields } from './types'

export const createSpecialOfferFourthValidation = z.object({
  [ESpecialOfferCreateFourthFormFields.description]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
})
