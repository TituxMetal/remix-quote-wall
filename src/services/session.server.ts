import { createCookieSessionStorage } from '@remix-run/node'

const sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set in env variables.')
}

const TEN_DAYS = 60 * 60 * 24 * 10
const maxAge = Number(process.env.SESSION_MAX_AGE) || TEN_DAYS

export const sessionStorage = createCookieSessionStorage({
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

export const { getSession, commitSession, destroySession } = sessionStorage
