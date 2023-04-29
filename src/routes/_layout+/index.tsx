import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

export const meta: V2_MetaFunction = () => [{ title: 'Remix Quote Wall' }]

interface Quote {
  quote: string
  by: string
}

export const loader: LoaderFunction = async (): Promise<Response> => {
  return json({
    quotes: [
      {
        quote: 'Light at the end of the tunnel, dey don cut am.',
        by: 'Brain Jotter'
      },
      {
        quote: 'Promised to stand by you, we don sit down.',
        by: 'Brain Jotter'
      },
      {
        quote: 'Polythecnic wey dey in Italy, Napoli.',
        by: 'Comrade with wisdom and Understanding'
      }
    ] as Array<Quote>
  })
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
        {quotes.map(({ quote, by }: Quote, index: string) => (
          <figure
            key={index}
            className='m-4 bg-purple-700 px-4 py-10 shadow-md shadow-purple-600'
          >
            <blockquote cite='https://wisdomman.com' className='py-3'>
              <p className='text-2xl text-gray-300'>{quote}</p>
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
