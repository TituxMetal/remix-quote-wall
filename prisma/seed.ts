import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const getQuotes = () => [
  {
    text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    by: 'Nelson Mandela'
  },
  {
    text: 'The way to get started is quit talking and begin doing.',
    by: 'Walt Disney'
  },
  {
    text: `Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma - which is living with results of other people's thinking.`,
    by: 'Steve Jobs'
  },
  {
    text: 'If life were predictable it would cease to be life, and be without flavour.',
    by: 'Eleanor Roosevelt'
  },
  {
    text: `If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough`,
    by: 'Oprah Winfrey'
  },
  {
    text: `Life is what happens when you're busy making other plans.`,
    by: 'John Lennon'
  }
]

const seed = async () => {
  const email = 'rachel@remix.run'

  // cleanup the existing database
  await prisma.user.deleteMany()
  await prisma.quote.deleteMany()

  const hashedPassword = await bcrypt.hash('racheliscool', 10)

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword
        }
      }
    }
  })
  await Promise.all(
    getQuotes().map(quote => prisma.quote.create({ data: quote }))
  )

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
