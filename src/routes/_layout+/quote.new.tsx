import type {
  ActionArgs,
  ActionFunction,
  LoaderArgs,
  LoaderFunction,
  V2_MetaFunction
} from '@remix-run/node'
import { makeDomainFunction } from 'domain-functions'

import { RemixForm } from '~/components/form'
import { formAction } from '~/lib/form-action.server'
import { createQuote } from '~/models'
import { QuoteSchema } from '~/schemas'
import { authenticator } from '~/services'

export const meta: V2_MetaFunction = () => [
  { title: 'Add a Quote to the Wall' }
]

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const { id } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  return formAction({
    request,
    schema: QuoteSchema,
    successPath: '/',
    mutation: makeDomainFunction(QuoteSchema)(async values =>
      createQuote({ ...values, userId: id })
    )
  })
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) =>
  authenticator.isAuthenticated(request, {
    failureRedirect: `/login`
  })

const NewQuotePage = () => {
  return (
    <div className='flex content-center items-center justify-center'>
      <section className='gradient my-10 rounded-md px-5 py-6 font-bold md:w-2/3 lg:m-10 lg:w-1/2'>
        <h1 className='mb-6 text-center text-4xl font-bold text-purple-100'>
          Add a new Quote
        </h1>
        <RemixForm
          schema={QuoteSchema}
          buttonLabel='Add Quote'
          multiline={['text']}
        />
      </section>
    </div>
  )
}

export default NewQuotePage
