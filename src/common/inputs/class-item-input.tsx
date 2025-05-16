import { useTranslations } from 'next-intl'
import React, { FC } from 'react'

type ClassItemInputProps = {
  name: string
  title: string
  price: number
  quantity?: number
  onQuantityChange?: (quantity: number) => void
  onDelete?: () => void
  image?: string
  min?: number
  max?: number
  disabled?: boolean
}

export const ClassItemInput: FC<ClassItemInputProps> = ({ name, title, price, quantity, image, onQuantityChange, onDelete, min, max, disabled }) => {
  const t = useTranslations('general');

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center">
        {image && <img src={image} alt={title} className="w-16 h-16 mr-4" />}
        <div>
          <h3 className="text-lg">{title}</h3>
          <p className="text-gray-500">{`$${price.toFixed(2)}`}</p>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          name={name}
          {...quantity && { value: quantity }}
          {...onQuantityChange && {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const value = Number(e.target.value)
              if (!isNaN(value)) {
                onQuantityChange(value)
              }
            }
          }}
          className="w-16 p-2 border border-gray-300 rounded mr-4"
          min={min ?? 0}
          max={max ?? 99}
          disabled={disabled}
        />
        {onDelete && <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          {t('delete')}
        </button>}
      </div>
    </div>
  )
}

export const ClassItemCheckbox: FC<ClassItemInputProps> = ({ name, title, price, quantity, image, onQuantityChange, onDelete, min, max, disabled }) => {
  const t = useTranslations('general');

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center">
        {image && <img src={image} alt={title} className="w-16 h-16 mr-4" />}
        <div>
          <h3 className="text-lg">{title}</h3>
          <p className="text-gray-500">{`$${price.toFixed(2)}`}</p>
        </div>
      </div>
      <div className="flex items-center scale-125">
        <input
          type="checkbox"
          name={name}
          {...quantity && { value: quantity }}
          {...onQuantityChange && {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const value = Boolean(e.target.value)
              onQuantityChange(value ? 1 : 0)
            }
          }}
          className="w-16 p-2 border border-gray-300 rounded mr-4 "
          disabled={disabled}
        />
        {onDelete && <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          {t('delete')}
        </button>}
      </div>
    </div>
  )
}