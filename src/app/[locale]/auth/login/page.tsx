import { RegisterLoginForm } from '@/common/forms';
import { useTranslations } from 'next-intl';

export default function Login() {
  const t = useTranslations('general')

  return (
    <div className="relative w-full h-screen bg-teal-600/90 pt-20 flex flex-col gap-5 items-center px-4">
      <h1 className='text-5xl w-full text-center text-white fontf-spectral scale-100 mb-7'> {t('login')} </h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg relative w-full sm:w-2/3 max-w-[500px] ">
        <div className="absolute top-0 left-0 w-full bg-teal-500 text-white text-xl font-bold p-3 rounded-t-2xl">
          {t('login')}
        </div>

        <RegisterLoginForm type='login' />
      </div>

    </div>
  );
}