import React, { FC } from 'react'

type SelectInputProps = {
  name: string
  options: OptionT[]
  label?: string
  className?: string
  placeholder?: string
  value?: OptionT
  defaultValue?: OptionT
  disabled?: boolean
  required?: boolean
  onChange?: (value: OptionT) => void
}

export const SelectInput: FC<SelectInputProps> = ({ name, options, label, className, placeholder, value, defaultValue, disabled, required, onChange }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label htmlFor={name} className="mb-2">{label}</label>}
      <select
        name={name}
        id={name}
        disabled={disabled}
        required={required}
        {...onChange && {
          onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedOption = options.find(option => option.value === e.target.value)
            if (selectedOption) {
              onChange(selectedOption)
            }
          }
        }}
        {...value && {
          value: value.value
        }}
        {...defaultValue && {
          defaultValue: defaultValue.value
        }}
        className="p-2 border border-gray-300 rounded"
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div >
  )
}
