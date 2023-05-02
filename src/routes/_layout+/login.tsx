import type {
  ActionArgs,
  ActionFunction,
  V2_MetaFunction
} from '@remix-run/node'
import { Link, useActionData, useSearchParams } from '@remix-run/react'

import { authService, sessionService } from '~/services'
import {
  badRequest,
  validateEmail,
  validatePassword,
  validateUrl
} from '~/utils'

export const meta: V2_MetaFunction = () => [{ title: 'Login to your account' }]

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

  const user = await authService.login({ email, password })

  if (!user) {
    return badRequest({ fields, formError: 'Invalid Credentials' })
  }

  return sessionService.createUserSession(user.id, validRedirectTo)
}

const inputClassName = `w-full rounded border-2 border-purple-100 bg-transparent px-2 py-1 text-xl text-purple-950`

const LoginPage = () => {
  const actionData = useActionData()
  const [searchParams] = useSearchParams()

  return (
    <div className='flex content-center items-center justify-center'>
      <section className='gradient my-10 rounded-md px-5 py-6 font-bold md:w-2/3 lg:m-10 lg:w-1/2'>
        <h1 className='mb-6 text-center text-4xl font-bold text-purple-100'>
          Login to your account
        </h1>
        <form method='post' className='flex flex-col gap-4'>
          <input
            type='hidden'
            name='redirectTo'
            value={searchParams.get('redirectTo') ?? undefined}
          />
          <fieldset className='flex justify-center'>
            <Link to='/register'>Need an Account?</Link>
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
            Login
          </button>
        </form>
      </section>
    </div>
  )
}

export default LoginPage
