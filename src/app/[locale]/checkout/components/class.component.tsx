import { FC } from 'react';

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
    <div className="bg-teal-300/30 p-4 rounded-md mb-3 min-w-[320px]">
      <h1 className="text-xl font-bold">{name}</h1>

      <div className="flex gap-5 items-center mt-4">
        <span className="text-lg">Price:</span>
        <span className="text-lg">{price} €</span>

        <div className="flex items-center ml-auto gap-3">
          <span className="font-bold">{quantity}</span>
          <button
            onClick={decrement}
            disabled={quantity === 0}
            className="px-2 py-1 bg-gray-100 rounded-md shadow-md transition hover:bg-gray-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <button
            onClick={increment}
            className="px-2 py-1 bg-green-200 rounded-md shadow-md transition hover:bg-green-300 active:scale-95"
          >
            +
          </button>
        </div>
      </div>

    </div>
  );
};
