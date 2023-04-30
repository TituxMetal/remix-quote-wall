import { Link, Outlet } from '@remix-run/react'

const Layout = () => {
  return (
    <>
      <nav className='gradient fixed left-0 top-0 w-full px-5'>
        <div className='mx-auto flex w-full max-w-screen-lg content-center justify-between py-3'>
          <Link className='text-3xl font-bold text-blue-50' to='/'>
            Quote Wall
          </Link>
          <ul className='flex flex-col items-center justify-between gap-x-4 font-bold md:flex-row'>
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
      <Outlet />
    </>
  )
}
export default Layout
