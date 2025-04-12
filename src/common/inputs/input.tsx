import { FC } from 'react'

type InputProps = {
  name: string
  label?: string
  placeholder?: string
  value?: string
  error?: string
  required?: boolean
  disabled?: boolean
  type?: React.HTMLInputTypeAttribute
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({ name, label, placeholder, value, error, required, disabled, type, onChange }) => {
  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={name} className='text-sm font-medium text-gray-700'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <input
        type={type ?? 'text'}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        {...(onChange && { onChange })}
        disabled={disabled}
        required={required}
        className={`mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300 ${error ? 'border-red-500' : 'border-gray-300'
          } ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
      />
      {error && <span className='text-red-500 text-sm mt-1'>{error}</span>}
    </div>
  )
}
