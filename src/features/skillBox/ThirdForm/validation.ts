import { z } from 'zod'
import { t } from 'i18next'

import { ESkillBoxCreateThirdFormFields } from './types'

export const createSkillBoxThirdValidation = z.object({
  [ESkillBoxCreateThirdFormFields.description]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
  [ESkillBoxCreateThirdFormFields.duration]: z
    .string()
    .min(1, { message: t('validation_error.no_empty') }),
})
