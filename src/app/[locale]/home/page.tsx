import { useTranslations } from 'next-intl';
import { LessonsList } from './(components)';
import { lessons } from './mocks';
import Image from 'next/image';
import img from '@/common/assets/grl-book.jpg'

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="bg-amber-100 w-full p-10 relative">
      <div className="flex align-center justify-center flex-wrap w-full z-index-[3] relative mb-9">
        <div className="text-gray-900 my-10 flex items-center justify-center">
          <div className="max-w-4xl px-8">
            <h1 className="text-5xl font-light italic leading-snug">
              {t('title')}
            </h1>

            <p className="mt-6 text-2xl font-semibold text-gray-800">
              {t('message')}
            </p>

            <p className="mt-4 text-lg font-normal">
              {t('description')}
            </p>
          </div>
        </div>

        <Image src={img} width={300} height={200} alt='main-img' className='rounded-2xl' objectFit={'contain'} />
      </div>

      <LessonsList lessons={lessons} title="Nuestro clases" />
    </div>
  );
}
