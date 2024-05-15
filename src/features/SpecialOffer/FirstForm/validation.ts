import { z } from 'zod'
import { t } from 'i18next'

import { ESpecialOfferCreateFirstFormFields } from './types'

export const createSpecialOfferFirstValidation = z.object({
  [ESpecialOfferCreateFirstFormFields.title]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),

  [ESpecialOfferCreateFirstFormFields.tags]: z.array(
    z.object({
      _id: z.string(),
      title: z.array(
        z.object({
          lang: z.string(),
          value: z.string(),
        }),
      ),
    }),
  ),
  [ESpecialOfferCreateFirstFormFields.address]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
  [ESpecialOfferCreateFirstFormFields.hideLikes]: z.boolean(),
})
