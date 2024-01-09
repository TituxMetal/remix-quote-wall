import { type User } from '@prisma/client'
import * as argon from 'argon2'
import { Authenticator, AuthorizationError } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'

import { createUser, getUserByEmail, getUserWithPassword } from '~/models'
import { invariant } from '~/utils/misc'

import { sessionStorage } from './session.server'

type AuthSession = Pick<User, 'id' | 'email'>

export const authenticator = new Authenticator<AuthSession>(sessionStorage, {
  sessionKey: 'sessionKey',
  sessionErrorKey: 'sessionErrorKey',
  throwOnError: true
})

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email')
    const password = form.get('password')

    invariant(typeof email === 'string', 'Email must be a string.')
    invariant(typeof password === 'string', 'Password must be a string.')

    const user = await getUserWithPassword(email)

    if (!user) {
      throw new AuthorizationError('Invalid credentials!')
    }

    const userPassword = user.password?.hash || ''
    const passwordMatches = await argon.verify(userPassword, password)

    if (!passwordMatches) {
      throw new AuthorizationError('Invalid credentials!')
    }

    const { id } = user

    return { id, email }
  }),
  'login'
)

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email')
    const password = form.get('password')

    invariant(typeof email === 'string', 'Email must be a string.')
    invariant(typeof password === 'string', 'Password must be a string.')

    const exisingUser = await getUserByEmail(email)

    if (exisingUser) {
      throw new AuthorizationError('Email already taken.')
    }

    const user = await createUser({ email, password })
    const { id } = user

    return { id, email }
  }),
  'register'
)
