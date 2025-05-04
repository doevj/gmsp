import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(req: Request) {
  try {
    const { items, locale } = (await req.json()) as {
      items: {
        name: string;
        price: number;
        quantity: number;
      }[];
      locale: string;
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.filter(v => v.quantity > 0).map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/checkout/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/wrong`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
