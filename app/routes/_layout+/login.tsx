import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction
} from '@remix-run/node'
import { Link } from '@remix-run/react'
import { makeDomainFunction } from 'domain-functions'
import { AuthorizationError } from 'remix-auth'
import { performMutation } from 'remix-forms'

import { RemixForm } from '~/components/form'
import { AuthSchema } from '~/schemas'
import { authenticator } from '~/services'

export const meta: MetaFunction = () => [{ title: 'Login to your account' }]

export const action = async ({ request }: ActionFunctionArgs) => {
  await performMutation({
    request,
    schema: AuthSchema,
    mutation: makeDomainFunction(AuthSchema)(async () => {})
  })

  try {
    return await authenticator.authenticate('login', request, {
      successRedirect: '/quote/new'
    })
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return { errors: { password: ['Invalid credentials!'] } }
    }

    throw error
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) =>
  authenticator.isAuthenticated(request, { successRedirect: '/' })

const LoginPage = () => {
  return (
    <div className='flex content-center items-center justify-center'>
      <section className='gradient my-10 rounded-md px-5 py-6 font-bold md:w-2/3 lg:m-10 lg:w-1/2'>
        <h1 className='mb-6 text-center text-4xl font-bold text-purple-100'>
          Login to your account
        </h1>
        <p className='flex justify-center'>
          <Link to='/register'>Need an Account?</Link>
        </p>
        <RemixForm schema={AuthSchema} buttonLabel='Login'>
          {({ Field, Button, Errors }) => (
            <>
              <Field name='email' />
              <Field name='password' type='password' />
              <Errors />
              <Button />
            </>
          )}
        </RemixForm>
      </section>
    </div>
  )
}

export default LoginPage
