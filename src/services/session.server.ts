import { createCookieSessionStorage, redirect } from '@remix-run/node'

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

const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession()

  session.set('userId', userId)

  const cookie = await storage.commitSession(session)

  return redirect(redirectTo, { headers: { 'Set-Cookie': cookie } })
}

const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get('Cookie'))
}

const getUserIdSession = async (request: Request) => {
  const session = await getUserSession(request)
  const userId = session.get('userId')

  if (!userId || typeof userId !== 'string') {
    return null
  }

  return userId
}

const requireUserId = async (request: Request, redirectTo: string) => {
  const userId = await getUserIdSession(request)

  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])

    throw redirect(`/login?${searchParams}`)
  }

  return userId
}

export default {
  createCookieSessionStorage,
  createUserSession,
  getUserIdSession,
  getUserSession,
  requireUserId,
  storage
}
