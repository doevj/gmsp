import { FC } from "react";
import { useTranslations } from "next-intl";
import { Input, SubmitButton, Textarea } from "../inputs";

export const ContactForm: FC<{ title: string }> = ({ title }) => {
  const t = useTranslations('general')

  return (
    <form action={sendMessage} className=" flex flex-col gap-4 p-6 bg-teal-500/50 rounded-lg w-full sm:w-2/3 max-w-[500px]">
      <h1 className="text-2xl text-center font-nunito text-white">{title}</h1>
      <Input name="name" label={t('name')} required textWhite />
      <Input name="email" label={t('email')} type="email" required textWhite />

      <Textarea name="message" label={t('message')} maxLength={500} textWhite />

      <SubmitButton label={t('send message')} className="mt-2 hover:scale-[101%] hover:bg-teal-700/80 transition" />
    </form>
  )
}

async function sendMessage(formData: FormData) {
  'use server';
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Send email 
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, text: message, name }),
  })


  console.log('Form submitted:', { name, email, message });
}
