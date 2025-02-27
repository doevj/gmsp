"use client";

import { sendMail } from "@/lib/send-mail";
import { useReducer, useState } from "react";
import { CheckoutButton, Class } from "./components";
import { useTranslations } from "next-intl";
import { Selector } from "@/common/components";

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

const options = [
  { value: "Spanish for Beginners", label: "Spanish for Beginners" },
  { value: "Intermediate Spanish", label: "Intermediate Spanish" },
  { value: "Advanced Spanish", label: "Advanced Spanish" },
  { value: "Spanish for kids", label: "Spanish for kids" },
  { value: "Business Spanish", label: "Business Spanish" },
  { value: "Spanish for travel", label: "Spanish for travel" },
  { value: "Grammar lessons", label: "Grammar lessons" },
  { value: "Writing practice", label: "Writing practice" },
  { value: "Spanish Conversation", label: "Spanish Conversation" },
  { value: "Spanish Pronunciation", label: "Spanish Pronunciation" },
];

export default function Checkout() {
  const t = useTranslations('Checkout');
  const [classItems, dispatch] = useReducer(reducer, items);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [chosenVariant, setChosenVariant] = useState('');

  const mailText = `attempt, Name: ${name}\n\n${classItems
    .map((item) => `${item.name}: ${item.quantity}`)
    .join("\n")}
    \n\nChosen class type: ${chosenVariant}
    \n\nTotal: ${classItems.reduce((acc, item) => acc + item.price * item.quantity, 0)} €
    \n\nEmail
    \n${email}
    `;

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
      <h1 className="w-full font-bold text-center align-center text-4xl mb-9"> {t('getClasses')} </h1>

      <div className="mb-10 flex flex-col gap-2 w-2/5 min-w-[310px]">
        <label htmlFor="name"> {t('fullName')} </label>
        <input
          name="name"
          type="text"
          placeholder="John Doe"
          className="border border-gray-200 p-2 rounded-md min-w-[310px]"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <div className="mb-3" />

        <label htmlFor="name"> {t('email')} </label>
        <input
          name="email"
          type="email"
          placeholder="john@gmail.com"
          className="border border-gray-200 p-2 rounded-md min-w-[310px]"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="mb-3" />

        <Selector
          value={chosenVariant}
          onChange={(v) => setChosenVariant(v)}
          options={options}
          label={t('chooseType')}
        />

      </div>

      <div className="flex flex-col gap-5 mb-5 w-2/5 min-w-[310px]">
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
        <h2 className="bold">{t('Total')}</h2>
        <h2>
          {total} €
        </h2>
      </div>

      <div className="m-5" />

      <div>
        <p className="text-gray-500 mb-2"> {t('redirect')} </p>
      </div>

      <CheckoutButton items={classItems} onClick={onSubmit} disabled={total < 1 || name?.length < 4} clientName={name} />
    </div>
  )
}
