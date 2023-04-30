import type { Quote } from '@prisma/client'
import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { prisma } from '~/lib'

export const meta: V2_MetaFunction = () => [{ title: 'Remix Quote Wall' }]

// interface Quote {
//   text: string
//   by: string
// }

export const loader: LoaderFunction = async (): Promise<Response> => {
  const quotes = await prisma.quote.findMany()

  return json({ quotes })
}

const IndexPage = () => {
  const { quotes } = useLoaderData<typeof loader>()

  return (
    <section>
      <nav className='fixed left-0 top-0 w-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 px-5'>
        <div className='mx-auto flex w-full max-w-screen-lg content-center justify-between py-3'>
          <Link className='text-3xl font-bold text-blue-50' to='/'>
            Quote Wall
          </Link>
          <ul className='flex flex-col items-center justify-between gap-x-4 font-bold text-blue-100 md:flex-row'>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/quote/new'>Add a Quote</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
      <section className='grid grid-cols-1 lg:grid-flow-row lg:grid-cols-3'>
        {quotes.map(({ text, by }: Quote, index: string) => (
          <figure
            key={index}
            className='m-4 bg-purple-700 px-4 py-10 shadow-md shadow-purple-600'
          >
            <blockquote className='py-3'>
              <p className='text-2xl text-gray-300'>{text}</p>
            </blockquote>
            <figcaption>
              <cite className='mb-4 text-right text-xl text-purple-100'>
                - {by}
              </cite>
            </figcaption>
          </figure>
        ))}
      </section>
    </section>
  )
}

export default IndexPage
