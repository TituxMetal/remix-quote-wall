import type { Quote } from '@prisma/client'
import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { prisma } from '~/lib'

export const meta: V2_MetaFunction = () => [{ title: 'Remix Quote Wall' }]

export const loader: LoaderFunction = async (): Promise<Response> => {
  const quotes = await prisma.quote.findMany()

  return json({ quotes })
}

const IndexPage = () => {
  const { quotes } = useLoaderData<typeof loader>()

  return (
    <section>
      <section className='grid grid-cols-1 lg:grid-flow-row lg:grid-cols-3'>
        {quotes.map(({ text, by }: Quote, index: string) => (
          <figure
            key={index}
            className='m-4 rounded-lg border-2 bg-purple-600 px-4 py-10'
          >
            <blockquote className='mb-2 py-3'>
              <p className='text-2xl text-gray-200'>{text}</p>
            </blockquote>
            <figcaption>
              <cite>- {by}</cite>
            </figcaption>
          </figure>
        ))}
      </section>
    </section>
  )
}

export default IndexPage
