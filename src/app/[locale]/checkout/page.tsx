import { CheckoutForm } from '@/common/forms';
import { useTranslations } from 'next-intl';

export default function Checkout() {
  const t = useTranslations('Checkout');
  const tt = useTranslations('general');
  return (
    <div className="w-full h-screen flex flex-col gap-2 items-center bg-teal-600/90 justify-center p-5">

      <h1 className="w-full font-bold text-white text-center align-center text-4xl mt-[-3rem] mb-20">
        {t('getClasses')}
      </h1>

      <div className='relative w-full sm:w-2/3 max-w-[500px] rounded-3xl overflow-visible'>
        <div className="absolute top-[-3rem] left-0 w-full bg-teal-500 text-white text-xl text-center font-bold p-3 rounded-t-2xl">
          <span>checkout</span>
        </div>

        <CheckoutForm />
      </div>
    </div>
  );
}
