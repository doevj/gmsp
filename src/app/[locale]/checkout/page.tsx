import { CheckoutForm } from '@/common/forms';
import { useTranslations } from 'next-intl';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata = {
  title: "Grama Spanish",
  description: "Grama Spanish Language School",
};

export default async function CheckoutWrapper({ searchParams }: Props) {
  const params = await searchParams;
  const isBundle = Boolean(params.bundle || false);
  return (
    <Checkout isBundle={isBundle} />
  )
}

function Checkout({ isBundle }: { isBundle: boolean }) {
  const t = useTranslations('Checkout');
  const tt = useTranslations('general');

  return (
    <div className="w-full flex flex-col gap-2 items-center bg-teal-600/90 justify-center p-5">

      <h1 className="w-full font-bold text-white text-center align-center text-4xl mb-20">
        {t('getClasses')}
      </h1>

      <div className='relative w-full sm:w-2/3 max-w-[500px] rounded-3xl overflow-visible mb-[10rem]'>
        <div className="absolute top-[-3rem] left-0 w-full bg-teal-500 text-white text-xl text-center font-bold p-3 rounded-t-2xl">
          <span>{tt('checkout')}</span>
        </div>

        <CheckoutForm
          isBundle={isBundle}
          variantOptions={isBundle ? classVariantBundleOptions : classVariantOptions}
          classType={isBundle ? classTypeBundleOptions : classTypeOptions}
        />
      </div>
    </div>
  );
}



const classVariantOptions: OptionT[] = [
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

const classVariantBundleOptions: OptionT[] = [
  { value: 'Spanish for Beginners Bundle', label: 'Spanish for Beginners Bundle' },
  { value: 'Intermediate Spanish Bundle', label: 'Intermediate Spanish Bundle' },
  { value: 'Advanced Spanish Bundle', label: 'Advanced Spanish Bundle' },
  { value: 'Spanish for kids Bundle', label: 'Spanish for kids Bundle' },
  { value: 'Business Spanish Bundle', label: 'Business Spanish Bundle' },
  { value: 'Spanish for travel Bundle', label: 'Spanish for travel Bundle' },
  { value: 'Grammar lessons Bundle', label: 'Grammar lessons Bundle' },
  { value: 'Writing practice Bundle', label: 'Writing practice Bundle' },
  { value: 'Spanish Conversation Bundle', label: 'Spanish Conversation Bundle' },
  { value: 'Spanish Pronunciation Bundle', label: 'Spanish Pronunciation Bundle' },
]

const classTypeOptions = [
  { title: 'Individual Classes', name: 'individual', price: 23 },
  { title: 'Pair Classes', name: 'pair', price: 17 },
  { title: 'Group Classes', name: 'group', price: 14 },
]

const classTypeBundleOptions = [
  { title: 'Individual Classes', name: 'individual', price: 200 },
  { title: 'Pair Classes', name: 'pair', price: 150 },
  { title: 'Group Classes', name: 'group', price: 130 },
]
