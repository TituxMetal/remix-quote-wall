import { Form as FrameworkForm, useActionData, useNavigation, useSubmit } from '@remix-run/react'
import { createForm, type FormProps, type FormSchema } from 'remix-forms'

import { Button, FormError, Input, Textarea } from '~/components/elements'

const Form = createForm({
  component: FrameworkForm,
  useActionData,
  useNavigation,
  useSubmit
})

export const RemixForm = <Schema extends FormSchema>(props: FormProps<Schema>) => (
  <Form<Schema>
    className='flex flex-col gap-4'
    errorComponent={FormError}
    inputComponent={Input}
    multilineComponent={Textarea}
    buttonComponent={Button}
    {...props}
  />
)
