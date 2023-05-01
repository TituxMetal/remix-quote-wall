import type {
  ActionArgs,
  ActionFunction,
  LoaderFunction
} from '@remix-run/node'
import { redirect } from '@remix-run/node'

import { logout } from '~/services'

export const action: ActionFunction = ({ request }: ActionArgs) => {
  return logout(request)
}

export const loader: LoaderFunction = () => {
  return redirect('/')
}
