import type { Quote } from '@prisma/client'

import { prisma } from '~/lib'

type CreateQuoteInput = {
  by: Quote['by']
  text: Quote['text']
  userId: Quote['userId']
}

export const createQuote = async (data: CreateQuoteInput) => {
  return prisma.quote.create({ data })
}
