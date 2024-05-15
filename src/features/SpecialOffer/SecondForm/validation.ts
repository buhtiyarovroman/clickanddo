import { z } from 'zod'
import { t } from 'i18next'

import { ESpecialOfferCreateSecondFormFields } from './types'
import { Schemas } from '@/shared/lib/validation'

export const createSpecialOfferSecondValidation = z.object({
  [ESpecialOfferCreateSecondFormFields.priceFrom]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
  [ESpecialOfferCreateSecondFormFields.priceTo]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
  [ESpecialOfferCreateSecondFormFields.currency]: Schemas.currency,
  [ESpecialOfferCreateSecondFormFields.duration]: z.string(),
  [ESpecialOfferCreateSecondFormFields.expirationDate]: z.date(),
})
