import { styled } from '@slicknode/stylemapper'
import { forwardRef, type InputHTMLAttributes } from 'react'

const inputClassName = `w-full rounded border-2 border-purple-100 bg-transparent px-2 py-1 text-xl text-purple-950`

const StyledInput = styled('input', inputClassName)

type Ref = HTMLInputElement
type Props = InputHTMLAttributes<Ref>

const AppInput = forwardRef<Ref, Props>(({ type = 'text', className, ...props }, ref) => (
  <StyledInput ref={ref} type={type} className={className} {...props} />
))
AppInput.displayName = 'Input'

export default AppInput
