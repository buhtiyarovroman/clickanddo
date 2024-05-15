import z from 'zod'

export const chatInputFormSchema = z.object({
  message: z.string().optional().or(z.literal('')),
})
