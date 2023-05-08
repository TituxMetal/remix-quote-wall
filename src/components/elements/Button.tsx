import { styled } from '@slicknode/stylemapper'

const buttonClasses = `w-min rounded-lg border-2 border-purple-100 bg-purple-700 px-10 py-3 font-bold hover:scale-105`

const AppButton = styled('button', buttonClasses)

export const Button = ({
  className,
  children
}: JSX.IntrinsicElements['button']) => (
  <AppButton className={className}>{children}</AppButton>
)
