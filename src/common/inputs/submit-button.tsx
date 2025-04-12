'use client';
import React, { FC } from 'react'
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl'


type SubmitButtonProps = {
  label?: string
  disabled?: boolean
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onSubmit?: (...args: unknown[]) => void
}

export const SubmitButton: FC<SubmitButtonProps> = ({ label, className, disabled, onClick, onSubmit }) => {
  const t = useTranslations('general');
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none cursor-pointer focus:shadow-outline ${className} ${disabled || pending ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...onClick && {
        onClick: (e) => {
          e.preventDefault()
          onClick(e)
        }
      }}
      {...onSubmit && {
        onSubmit: (e) => {
          e.preventDefault()
          onSubmit(e)
        }
      }}
      disabled={pending || disabled}
    >
      {label ?? t('submit')}
    </button>
  )
}
