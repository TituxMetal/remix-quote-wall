import type { Password, User } from '@prisma/client'
import { redirect } from '@remix-run/node'
import bcrypt from 'bcryptjs'

import { prisma } from '~/lib'

import sessionService from './session.server'

type LoginForm = {
  email: User['email']
  password: Password['hash']
}

const logout = async (request: Request) => {
  const session = await sessionService.getUserSession(request)

  return redirect('/login', {
    headers: {
      'Set-Cookie': await sessionService.storage.destroySession(session)
    }
  })
}

const login = async ({ email, password }: LoginForm) => {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: { password: true }
  })

  if (!userWithPassword || !userWithPassword.password) {
    return null
  }

  const passwordMatches = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  )

  if (!passwordMatches) {
    return null
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return userWithoutPassword
}

const register = async ({ email, password }: LoginForm) => {
  const passwordHash = await bcrypt.hash(password, 12)
  const newUser = await prisma.user.create({
    data: { email, password: { create: { hash: passwordHash } } }
  })

  return newUser
}

const getUser = async (request: Request) => {
  const userId = await sessionService.getUserIdSession(request)

  if (typeof userId !== 'string') {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true }
    })

    return user
  } catch {
    throw logout(request)
  }
}

export default { getUser, login, logout, register }
