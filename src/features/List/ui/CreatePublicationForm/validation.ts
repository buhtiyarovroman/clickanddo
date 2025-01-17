import { z } from 'zod'
import { TFunction } from 'i18next'
import { ELanguages } from '@/app/i18n'
import { Schemas } from '@/shared/lib/validation'

export const createPublicationSchema = (t: TFunction<ELanguages, undefined>) =>
  z.object({
    images: z
      .array(
        z.object({
          id: z.string(),
          path: z.string(),
        }),
      )
      .min(1, { message: t('validation_error.no_empty') }),
    location: z
      .string()
      .min(1, { message: 'validation_error.no_empty' })
      .or(z.literal('')),
    coordinates: z.array(z.number()),
    title: z.string().min(1, { message: 'validation_error.no_empty' }),
    description: z.string().min(1, { message: 'validation_error.no_empty' }),
    price: z
      .number()
      .optional()
      .refine(price => price === undefined || !isNaN(parseInt(price)), {
        message: t('validation_error.no_empty'),
        path: ['price'],
      }),
    currency: Schemas.currency,
    hideLikes: z.boolean(),
    hashtag: Schemas.hashtags.min(1, {
      message: t('validation_error.no_empty'),
    }),
  })
