import { z } from 'zod'

import { getErrorMessage } from '~/utils'

export const QuoteSchema = z.object({
  by: z
    .string()
    .trim()
    .min(4, getErrorMessage({ min: 4 }).minLength),
  text: z
    .string()
    .trim()
    .min(6, getErrorMessage({ min: 6 }).minLength)
    .max(100, getErrorMessage({ max: 100 }).maxLength)
})
