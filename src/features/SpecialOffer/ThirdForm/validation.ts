import { z } from 'zod'
import { t } from 'i18next'

import { ESpecialOfferCreateThirdFormFields } from './types'

export const createSpecialOfferThirdValidation = z.object({
  [ESpecialOfferCreateThirdFormFields.photos]: z
    .array(
      z.object({
        id: z.string(),
        path: z.string(),
      }),
    )
    .min(1, { message: t('validation_error.no_empty') }),
})
