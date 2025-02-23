import { FC, ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'active' | 'trust' | 'danger' | 'normal'
}

export const Button: FC<ButtonProps> = ({ variant = 'normal', className, children, ...rest }) => {
  const variantClasses = {
    active: 'bg-yellow-300',
    trust: 'bg-green-300',
    danger: 'bg-red-300',
    normal: '',
  }

  return (
    <button
      className={
        cn(
          variantClasses[variant],
          'text-gray-800 font-semibold py-2 px-4 rounded',
          className
        )
      }
      {...rest}
    >
      {children}
    </button>
  )
}
