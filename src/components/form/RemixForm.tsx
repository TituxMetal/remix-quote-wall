import {
  Form as FrameworkForm,
  useActionData,
  useSubmit,
  useNavigation
} from '@remix-run/react'
import type { FormProps, FormSchema } from 'remix-forms'
import { createForm } from 'remix-forms'

import { Button, FormError, Input } from '~/components/elements'

const Form = createForm({
  component: FrameworkForm,
  useActionData,
  useNavigation,
  useSubmit
})

export const RemixForm = <Schema extends FormSchema>(
  props: FormProps<Schema>
) => (
  <Form<Schema>
    className='flex flex-col gap-4'
    errorComponent={FormError}
    inputComponent={Input}
    buttonComponent={Button}
    {...props}
  />
)
