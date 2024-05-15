import { z } from 'zod'

export type TSchema<TSchemaType extends z.ZodTypeAny> = z.infer<TSchemaType>
