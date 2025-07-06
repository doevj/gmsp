import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { checkDb } from '@/utils/check-db';
import { Button, LessonsList } from '@/common/components';
import { Video, Testimonials } from './(components)';
import { lessons } from './mocks';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('Home');
  checkDb();
  const locale = useLocale();

  return (
    <>
      <div className="w-full sm:p-10 relative ">
        <Video />

        <div className="mt-[7rem]" />

        <div className="relative w-4/6 min-w-[320px] max-w-[900px] mx-auto flex flex-col items-center justify-center text-white text-center p-10 bg-teal-900 bg-opacity-40 rounded-3xl">
          <Image src="/media/svg/logo-white.svg" height={500} width={500} alt='logo' />
          <p className="md:text-4xl mt-4">{t('The best way to learn')}</p>
          <Link href={`/${locale}/courses`}>
            <button className="mt-6 px-6 py-3 border border-white rounded-lg text-lg font-medium hover:bg-white hover:text-black transition-all">
              {t('Start Learning')}
            </button>
          </Link>
        </div>

        <div className="mb-[13rem]" />

      </div>

      <div className="mb-10" />

      <div className='relative'>
        <LessonsList lessons={lessons} title="Choose your way" wide />
      </div>

      <div className="mb-10" />
      <div className="mb-10" />

      <Testimonials />

      <div className=' mb-7 flex flex-col items-center justify-center mt-4 bg-teal-600/80 text-white py-10 px-8 text-4xl font-bold font-nunito no-underline'>
        <h4> {t('Schedule your free trial class')} </h4>
        <Link href={`/${locale}/contacts`}>
          <Button className="mt-6 px-6 py-3 border scale-[1!important] border-white rounded-lg text-lg font-medium hover:bg-white hover:text-teal-500 transition-all">
            {t('Book now')}
          </Button>
        </Link>
      </div>
    </>
  );
}