import { FC } from 'react'

type TextareaProps = {
  name: string
  label?: string
  placeholder?: string
  value?: string
  error?: string
  required?: boolean
  disabled?: boolean
  maxLength?: number
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea: FC<TextareaProps> = ({ name, label, placeholder, value, error, required, disabled, maxLength, onChange }) => {
  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={name} className='text-sm font-medium text-gray-700'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        {...(onChange && { onChange })}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        className={`mt-1 p-2 min-h-[200px] border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300 ${error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
      />
      {error && <span className='text-red-500 text-sm mt-1'>{error}</span>}
    </div>
  )
}
