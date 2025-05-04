import { FC } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useTranslations } from 'next-intl'
import { ClassItemInput, Input, SelectInput, SubmitButton } from '../inputs'
import { redirect } from 'next/navigation';

const variantOptions = [
  { value: 'Spanish for Beginners', label: 'Spanish for Beginners' },
  { value: 'Intermediate Spanish', label: 'Intermediate Spanish' },
  { value: 'Advanced Spanish', label: 'Advanced Spanish' },
  { value: 'Spanish for kids', label: 'Spanish for kids' },
  { value: 'Business Spanish', label: 'Business Spanish' },
  { value: 'Spanish for travel', label: 'Spanish for travel' },
  { value: 'Grammar lessons', label: 'Grammar lessons' },
  { value: 'Writing practice', label: 'Writing practice' },
  { value: 'Spanish Conversation', label: 'Spanish Conversation' },
  { value: 'Spanish Pronunciation', label: 'Spanish Pronunciation' },
];

export const CheckoutForm: FC = () => {
  const t = useTranslations('general')

  return (
    <form action={submitCheckout} className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md'>
      <div className="mb-4" />
      <Input name="name" label={t('name')} required />
      <Input name="email" label={t('email')} type="email" required />
      <SelectInput name="variant" label={t('choose variant')} options={variantOptions.map(v => ({ value: v.value, label: t(v.label) }))} required />

      <ClassItemInput title={t('Individual Classes')} name="individual" price={25} />
      <ClassItemInput title={t('Pair Classes')} name="pair" price={17} />
      <ClassItemInput title={t('Group Classes')} name="group" price={14} />

      <SubmitButton />
    </form>
  )
}

const submitCheckout = async (data: FormData) => {
  "use server"
  const name = data.get('name') as string
  const email = data.get('email') as string
  const variant = data.get('variant') as string

  const individual = Number(data.get('individual'))
  const pair = Number(data.get('pair'))
  const group = Number(data.get('group'))

  if (!name || !email || !variant || !(individual || pair || group)) {
    console.error('Missing required fields')
    throw new Error('Missing required fields')
    return
  }

  const mailText = `attempt, Name: ${name}\n\n${individual} Individual Classes\n${pair} Pair Classes\n${group} Group Classes\n\nChosen class type: ${variant}\n\nTotal: ${individual * 25 + pair * 17 + group * 14} €\n\nEmail\n${email}`
  // Send email 
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, text: mailText }),
  })
  if (!response.ok) {
    console.error('Failed to send email:', response.statusText)
    throw new Error('Failed to send email')
  }
  const res = await response.json()
  console.log(res)

  // Stripe checkout
  const checkoutRes = await handleCheckout({
    items: [
      { name: 'Individual Classes', price: 25, quantity: individual },
      { name: 'Pair Classes', price: 17, quantity: pair },
      { name: 'Group Classes', price: 14, quantity: group },
    ],
    locale: 'en',
    clientName: name,
  })
}

type handleCheckoutParams = {
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  locale: string;
  clientName?: string;
}

const handleCheckout = async ({ items, locale, clientName }: handleCheckoutParams) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, locale, clientName }),
  });

  const { sessionId } = await response.json();

  if (sessionId) {
    redirect(`/${locale}/checkout/stripe?sessionId=${sessionId}`);
  }
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);