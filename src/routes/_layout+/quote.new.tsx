import type {
  ActionArgs,
  ActionFunction,
  LoaderArgs,
  LoaderFunction,
  V2_MetaFunction
} from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'

import { prisma } from '~/lib'
import { authenticator } from '~/services'

export const meta: V2_MetaFunction = () => [
  { title: 'Add a Quote to the Wall' }
]

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const { id } = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })
  const formData = await request.formData()
  const { text, by } = Object.fromEntries(formData)

  if (
    typeof text !== 'string' ||
    text.length === 0 ||
    typeof by !== 'string' ||
    by.length === 0
  ) {
    return json({ error: 'Form not submitted correctly.' }, { status: 400 })
  }

  const fields = { text, by }

  await prisma.quote.create({ data: { userId: id, ...fields } })

  return redirect('/')
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) =>
  authenticator.isAuthenticated(request, {
    failureRedirect: `/login`
  })

const inputClassName = `w-full rounded border-2 border-purple-100 bg-transparent px-2 py-1 text-xl text-purple-950`

const NewQuotePage = () => {
  return (
    <div className='flex content-center items-center justify-center'>
      <section className='gradient my-10 rounded-md px-5 py-6 font-bold md:w-2/3 lg:m-10 lg:w-1/2'>
        <h1 className='mb-6 text-center text-4xl font-bold text-purple-100'>
          Add a new Quote
        </h1>
        <form method='post' className='flex flex-col gap-4'>
          <label className='text-xl leading-7 text-purple-100'>
            Quote Master:
            <input className={inputClassName} type='text' name='by' required />
          </label>
          <label className='text-xl leading-7 text-purple-100'>
            Quote Text
            <textarea
              className={`${inputClassName} h-44 min-h-full resize-none`}
              name='text'
              id=''
              required
            />
          </label>
          <button
            className='w-min rounded-lg border-2 border-purple-100 bg-purple-700 px-10 py-3 font-bold hover:scale-105'
            type='submit'
          >
            Add
          </button>
        </form>
      </section>
    </div>
  )
}

export default NewQuotePage
