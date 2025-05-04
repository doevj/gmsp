import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { Input, SubmitButton } from '../inputs'

type RegisterLoginFormProps = {
  type: 'register' | 'login'
}

export const RegisterLoginForm: FC<RegisterLoginFormProps> = ({ type }) => {
  const t = useTranslations('general')
  return (
    <form action={type === 'login' ? handleLogin : handleRegister} className={styles.formContainer}>

      {type === 'register' && <Input name="name" label={t('name')} required />}
      <Input name="email" label={t('email')} type="email" required />
      <Input name="password" label={t('password')} type="password" required />
      {type === 'register' && <Input name="confirmPassword" label={t('confirmPassword')} type="password" required />}

      <SubmitButton />
    </form>
  )
}

const styles = {
  formContainer: "mt-10 flex flex-col gap-4 p-2 px-1 bg-white rounded-lg"
}

const handleRegister = async (formData: FormData) => {
  'use server';
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }
  if (!name || !email || !password) {
    throw new Error('All fields are required');
  }

  await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not ok');
    }
  }).then((data) => {
    console.log('Success:', data);
  }).catch((error) => {
    console.error('Error:', error);
  });
}

const handleLogin = async (formData: FormData) => {
  'use server'
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    throw new Error('All fields are required');
  }

  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not ok');
    }
  }).then((data) => {
    console.log('Success:', data);
  }).catch((error) => {
    console.error('Error:', error);
  });
}