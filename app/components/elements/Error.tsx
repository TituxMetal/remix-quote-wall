import { styled } from '@slicknode/stylemapper'
import { type HTMLAttributes } from 'react'

const errorClassName = `mt-2 font-bold text-pink-200`

const Error = styled('p', errorClassName)

export const FormError = ({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) => (
  <Error className={className} {...rest} />
)
