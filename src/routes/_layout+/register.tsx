import type {
  ActionArgs,
  ActionFunction,
  V2_MetaFunction
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useActionData, useSearchParams } from '@remix-run/react'

import { prisma } from '~/lib'
import { createUserSession, register } from '~/services'

export const meta: V2_MetaFunction = () => [{ title: 'Create a new account' }]

const validateEmail = (email: unknown) => {
  if (typeof email !== 'string' || email.length < 3) {
    return `Email must not be empty`
  }

  if (!email.includes('@')) {
    return `Email must be a valid email.`
  }

  return false
}
const validatePassword = (password: unknown) => {
  if (typeof password !== 'string' || password.length === 0) {
    return `Password must not be empty.`
  }

  if (password.length < 6) {
    return `Password must be at least 6 characters long.`
  }

  return false
}

const validateUrl = (url: string) => {
  const urls = ['/', '/quote/new']

  if (urls.includes(url)) {
    return url
  }

  return '/'
}

const badRequest = (data: any) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData()
  const { email, password, redirectTo } = Object.fromEntries(formData)

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return badRequest({ formError: `Invalid form submission.` })
  }

  const validRedirectTo = validateUrl(redirectTo || '/')
  const fields = { email, password }
  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password)
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields })
  }

  const userExists = await prisma.user.findUnique({ where: { email } })

  if (userExists) {
    return badRequest({
      fields,
      formError: 'Something went wrong trying to create a new user.'
    })
  }

  const user = await register({ email, password })

  if (!user) {
    return badRequest({
      fields,
      formError: 'Something went wrong trying to create a new user.'
    })
  }

  return createUserSession(user.id, validRedirectTo)
}

const inputClassName = `w-full rounded border-2 border-purple-100 bg-transparent px-2 py-1 text-xl text-purple-950`

const RegisterPage = () => {
  const actionData = useActionData()
  const [searchParams] = useSearchParams()

  return (
    <div className='flex content-center items-center justify-center'>
      <section className='gradient my-10 rounded-md px-5 py-6 font-bold md:w-2/3 lg:m-10 lg:w-1/2'>
        <h1 className='mb-6 text-center text-4xl font-bold text-purple-100'>
          Create a new account
        </h1>
        <form method='post' className='flex flex-col gap-4'>
          <input
            type='hidden'
            name='redirectTo'
            value={searchParams.get('redirectTo') ?? undefined}
          />
          <fieldset className='flex justify-center'>
            <Link to='/login'>Already have an account?</Link>
          </fieldset>
          <label className='text-xl leading-7 text-purple-100'>
            Email:
            <input
              className={inputClassName}
              defaultValue={actionData?.fields?.email}
              aria-invalid={Boolean(actionData?.fieldErrors?.email)}
              aria-errormessage={
                actionData?.fieldErrors?.email ? 'email-error' : undefined
              }
              type='email'
              name='email'
              required
            />
            {actionData?.fieldErrors?.email && (
              <p
                className='mt-2 font-bold text-pink-200'
                role='alert'
                id='email-error'
              >
                {actionData.fieldErrors.email}
              </p>
            )}
          </label>
          <label className='text-xl leading-7 text-purple-100'>
            Password:
            <input
              className={inputClassName}
              defaultValue={actionData?.fields?.password}
              aria-invalid={Boolean(actionData?.fieldErrors?.password)}
              aria-errormessage={
                actionData?.fieldErrors?.password ? 'password-error' : undefined
              }
              type='password'
              name='password'
              minLength={6}
              required
            />
            {actionData?.fieldErrors?.password && (
              <p
                className='mt-2 font-bold text-pink-200'
                role='alert'
                id='password-error'
              >
                {actionData.fieldErrors.password}
              </p>
            )}
          </label>
          {actionData?.formError && (
            <div id='form-error-message'>
              <p className='mt-2 font-bold text-pink-200' role='alert'>
                {actionData.formError}
              </p>
            </div>
          )}
          <button
            className='w-min rounded-lg border-2 border-purple-100 bg-purple-700 px-10 py-3 font-bold hover:scale-105'
            type='submit'
          >
            Register
          </button>
        </form>
      </section>
    </div>
  )
}

export default RegisterPage
