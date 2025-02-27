"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useLocale } from "next-intl";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const CheckoutButton: React.FC<{
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  onClick: () => void;
  disabled: boolean;
  clientName?: string;
}> = ({ items, onClick, disabled, clientName }) => {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    onClick();
    setLoading(true);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, locale, clientName }),
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