import { styled } from '@slicknode/stylemapper'
import { forwardRef, type TextareaHTMLAttributes } from 'react'

type Ref = HTMLTextAreaElement
type Props = TextareaHTMLAttributes<Ref>

const AppTextarea = forwardRef<Ref, Props>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={className} {...props} />
))
AppTextarea.displayName = 'Textarea'

const textareaClassName = `h-44 min-h-full w-full resize-none rounded border-2 border-purple-100 bg-transparent px-2 py-1 text-xl text-purple-950`

const StyledTextarea = styled(AppTextarea, textareaClassName)

export default StyledTextarea
