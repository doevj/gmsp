"use client";

import { useReducer, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLocale } from "next-intl";
import { Class } from "./components";
import { sendMail } from "@/lib/send-mail";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutButton: React.FC<{
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  onClick: () => void;
  disabled: boolean;
}> = ({ items, onClick, disabled }) => {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    onClick();
    setLoading(true);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, locale }),
    });

    const { sessionId } = await response.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId });
    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || loading}
      className="text-white px-4 py-2 bg-green-500 rounded border hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Processing..." : "Checkout"}
    </button>
  );
};

type ClassItem = {
  name: string;
  price: number;
  quantity: number;
}

const items = [
  { name: "Individual Classes", price: 23, quantity: 0 },
  { name: "Pair Classes", price: 17, quantity: 0 },
  { name: "Group Classes", price: 14, quantity: 0 },
] as ClassItem[];

type Action = { type: "INCREMENT"; name: string } | { type: "DECREMENT"; name: string };

const reducer = (state: ClassItem[], action: Action): ClassItem[] => {
  return state.map((item) =>
    item.name === action.name
      ? {
        ...item,
        quantity: action.type === "INCREMENT" ? item.quantity + 1 : Math.max(0, item.quantity - 1),
      }
      : item
  );
};

export default function Checkout() {
  const [classItems, dispatch] = useReducer(reducer, items);
  const [name, setName] = useState('');
  const mailText = `Name: ${name}\n\n${classItems
    .map((item) => `${item.name}: ${item.quantity}`)
    .join("\n")}`;

  const onSubmit = async () => {
    const response = await sendMail({
      email: '',
      subject: 'New Contact Us Form',
      text: mailText,
    });
    console.log({ response })
  }

  const total = classItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-amber-100 bg-opacity-50 min-h-[80vh] p-10 min-w-[300px] flex flex-col items-center align-center justify-center">
      <h1 className="w-full font-bold text-center align-center text-4xl mb-9"> Get Classes </h1>

      <div className="mb-10 flex flex-col gap-2 w-2/5">
        <label htmlFor="name">Your full name</label>
        <input
          name="name"
          type="text"
          placeholder="John Doe"
          className="border border-gray-200 p-2 rounded-md min-w-[300px]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-5 mb-5 w-2/5">
        {classItems.map((item) => (
          <Class
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            increment={() => dispatch({ type: "INCREMENT", name: item.name })}
            decrement={() => dispatch({ type: "DECREMENT", name: item.name })}
            key={item.name}
          />
        ))}
      </div>

      <div className="ml-1 flex justify-between w-1/5 min-w-[300px] bg-white p-3 px-5 rounded-md">
        <h2 className="bold">TOTAL</h2>
        <h2>
          {total} €
        </h2>
      </div>

      <div className="m-5" />

      <div>
        <p className="text-gray-500 mb-2">You will be redirected to the payment page</p>
      </div>
      <CheckoutButton items={classItems} onClick={onSubmit} disabled={total < 1 || name?.length < 4} />
    </div>
  )
}
