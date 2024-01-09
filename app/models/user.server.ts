import { type Password, type User } from '@prisma/client'
import * as argon from 'argon2'

import { prisma } from '~/lib'

type CreateUserInput = {
  email: User['email']
  password: Password['hash']
}

export const getUserByEmail = async (email: string) => prisma.user.findUnique({ where: { email } })

export const getUserWithPassword = async (email: string) =>
  prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, password: true }
  })

export const createUser = async (data: CreateUserInput) => {
  const { password, ...dto } = data
  const hash = await argon.hash(password)

  return prisma.user.create({
    data: { ...dto, password: { create: { hash } } }
  })
}
