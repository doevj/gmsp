import { FC } from "react";
import { useTranslations } from "next-intl";
import { Input, SubmitButton, Textarea } from "../inputs";

export const ContactForm: FC = () => {
  const t = useTranslations('general')

  return (
    <form action={sendMessage} className="mt-10 flex flex-col gap-4 p-2 px-1 bg-white rounded-lg">

      <Input name="name" label={t('name')} required />
      <Input name="email" label={t('email')} type="email" required />

      <Textarea name="message" label={t('message')} maxLength={500} />

      <SubmitButton label={t('send message')} className="mt-2" />
    </form>
  )
}

async function sendMessage(formData: FormData) {
  'use server';
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  console.log('Form submitted:', { name, email, message });
}
