import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'

import { getUserFromDb } from '~/services'

export const loader: LoaderFunction = async ({
  request,
  params
}: LoaderArgs) => {
  const user = await getUserFromDb(request)

  return json(user)
}

const Layout = () => {
  const user = useLoaderData()

  return (
    <>
      <nav className='gradient fixed left-0 top-0 w-full px-5'>
        <div className='mx-auto flex w-full max-w-screen-lg content-center justify-between py-3'>
          <Link className='text-3xl font-bold text-blue-50' to='/'>
            Quote Wall
          </Link>
          <ul className='flex flex-col items-center justify-between gap-x-4 font-bold md:flex-row'>
            {user ? (
              <>
                <li>
                  <Link to='/quote/new'>Add a Quote</Link>
                </li>
                <li>
                  <form action='/logout' method='post'>
                    <button type='submit'>Logout</button>
                  </form>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  )
}
export default Layout
