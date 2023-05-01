import type { Password, User } from '@prisma/client'
import { createCookieSessionStorage, redirect } from '@remix-run/node'
import bcrypt from 'bcryptjs'

import { prisma } from '~/lib'

const sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set in env variables.')
}

const TEN_DAYS = 60 * 60 * 24 * 10
const maxAge = Number(process.env.SESSION_MAX_AGE) || TEN_DAYS

const storage = createCookieSessionStorage({
  cookie: {
    name: 'rmx-quote-wall_session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge,
    httpOnly: true
  }
})

export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession()

  session.set('userId', userId)

  const cookie = await storage.commitSession(session)

  return redirect(redirectTo, { headers: { 'Set-Cookie': cookie } })
}

const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get('Cookie'))
}

export const getUserIdSession = async (request: Request) => {
  const session = await getUserSession(request)
  const userId = session.get('userId')

  if (!userId || typeof userId !== 'string') {
    return null
  }

  return userId
}

type LoginForm = {
  email: User['email']
  password: Password['hash']
}

/**
 * @TODO Move this function in a auth service
 */
export const logout = async (request: Request) => {
  const session = await getUserSession(request)

  return redirect('/login', {
    headers: { 'Set-Cookie': await storage.destroySession(session) }
  })
}

/**
 * @TODO Move this function in a auth service
 */
export const login = async ({ email, password }: LoginForm) => {
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

/**
 * @TODO Move this function in a auth service
 */
export const register = async ({ email, password }: LoginForm) => {
  const passwordHash = await bcrypt.hash(password, 12)
  const newUser = await prisma.user.create({
    data: { email, password: { create: { hash: passwordHash } } }
  })

  return newUser
}

/**
 * @TODO Move this function in a auth service
 * @TODO Replace request arg by userId
 * @TODO Remove userId const and the typeof check
 */
export const getUserFromDb = async (request: Request) => {
  const userId = await getUserIdSession(request)

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

export const requireUserId = async (request: Request, redirectTo: string) => {
  const userId = await getUserIdSession(request)

  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])

    throw redirect(`/login?${searchParams}`)
  }

  return userId
}
