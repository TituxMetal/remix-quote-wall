import { json } from '@remix-run/node'

export const badRequest = (data: any) => json(data, { status: 400 })

type Props = {
  min?: number
  max?: number
}
export const getErrorMessage = (props?: Props) => {
  const { min, max } = props || {}

  return {
    isEmail: `Please enter a valid email.`,
    minLength: `This field must contain at least ${min} character(s).`,
    maxLength: `This field must contain at most ${max} character(s).`
  }
}
