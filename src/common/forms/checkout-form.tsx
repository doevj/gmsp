import { FC } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useTranslations } from 'next-intl'
import { ClassItemInput, Input, SelectInput, SubmitButton } from '../inputs'
import { redirect } from 'next/navigation';
import { ClassItemCheckbox } from '../inputs/class-item-input';

export const CheckoutForm: FC<{
  variantOptions: OptionT[]
  classType: { title: string, name: string, price: number }[],
  isBundle?: boolean
}> = ({ variantOptions, classType, isBundle }) => {
  const t = useTranslations('Checkout')

  return (
    <form action={submitCheckout} className='flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md'>
      {/* <div className="mb-4" /> */}
      <Input name="name" label={t('name')} required />
      <Input name="email" label={t('email')} type="email" required />
      <SelectInput
        placeholder='Choose a class type'
        name="variant"
        label={t('choose variant')}
        options={variantOptions.map(v => ({ value: v.value, label: t(v.label) }))}
        defaultValue={{ value: 'Intermediate Spanish', label: '' }}
        required
      />

      {classType.map((item) => !isBundle ? (
        <ClassItemInput
          key={item.name}
          title={t(item.title)}
          name={item.name}
          price={item.price}
        />
      ) : (
        <ClassItemCheckbox
          key={item.name}
          title={t(item.title)}
          name={item.name}
          price={item.price}
        />
      )
      )}

      <SubmitButton className='hover:scale-[101%] hover:bg-teal-800 transition' />
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