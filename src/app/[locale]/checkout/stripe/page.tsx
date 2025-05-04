'use client'
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function StripeCheckout() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('sessionId');

  if (sessionId) {
    (async () => {
      const stripe = await stripePromise;
      stripe?.redirectToCheckout({ sessionId });
    })()
  }
  return <></>
}
