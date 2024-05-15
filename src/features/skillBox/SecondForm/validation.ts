import { z } from 'zod'
import { t } from 'i18next'

import { ESkillBoxCreateSecondFormFields } from './types'

export const createSkillBoxSecondValidation = z.object({
  [ESkillBoxCreateSecondFormFields.location]: z.array(z.number()),
  [ESkillBoxCreateSecondFormFields.locationRange]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
  [ESkillBoxCreateSecondFormFields.address]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
})
