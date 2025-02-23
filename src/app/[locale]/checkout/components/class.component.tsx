import { FC } from 'react'

type Props = {
  name: string;
  price: number;
  quantity: number;
  increment: () => void;
  decrement: () => void;
}

export const Class: FC<Props> = ({
  name, price, quantity, increment, decrement
}) => {
  return (
    <div className="bg-white  p-4 rounded-md w-2/5 mb-3 min-w-[300px]">
      <h1 className="text-xl font-bold">{name}</h1>

      <div className="flex gap-5 items-center mt-4">
        <span className="text-lg">Price:</span>
        <span className="text-lg">{price} €</span>

        <div className="flex items-center ml-auto gap-3">
          <span className="font-bold">{quantity}</span>
          <button
            onClick={decrement}
            disabled={quantity === 0}
            className="px-2 py-1 bg-gray-200 rounded-md shadow-md transition hover:bg-gray-300 active:scale-95 disabled:opacity-50"
          >
            -
          </button>
          <button
            onClick={increment}
            className="px-2 py-1 bg-gray-200 rounded-md shadow-md transition hover:bg-gray-300 active:scale-95"
          >
            +
          </button>
        </div>
      </div>

    </div>
  )
}
