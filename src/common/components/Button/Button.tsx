import { FC, ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'active' | 'trust' | 'danger' | 'normal'
}

export const Button: FC<ButtonProps> = ({ variant = 'normal', className, children, ...rest }) => {
  const variantClasses = {
    active: 'bg-teal-700',
    trust: 'bg-green-300',
    danger: 'bg-red-300',
    normal: '',
  }

  return (
    <button
      className={
        cn(
          variantClasses[variant],
          'font-semibold py-1 px-2 sm:py-2 sm:px-4 rounded scale-[75%] sm:scale-[100%] hover:text-zinc-100',
          className
        )
      }
      {...rest}
    >
      {children}
    </button>
  )
}
