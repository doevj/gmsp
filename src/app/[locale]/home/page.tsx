import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LessonsList, Video } from './(components)';
import { lessons } from './mocks';


function MainView() {
  const t = useTranslations('Home');

  return (
    <div className="relative w-4/6 min-w-[320px] mx-auto flex flex-col items-center justify-center text-white text-center p-10 bg-teal-700 bg-opacity-30 rounded-3xl">
      <Image src="/media/svg/logo-white.svg" height={500} width={500} alt='logo' />
      <p className="text-4xl mt-4">The best way to learn</p>
      <button className="mt-6 px-6 py-3 border border-white rounded-lg text-lg font-medium hover:bg-white hover:text-black transition-all">
        Start Learning
      </button>
    </div>
  )
}

export default function Home() {
  return (
    <div className="w-full p-10 relative">
      <Video />

      <div className="mb-20" />

      <MainView />

      <div className="mb-20" />

      <LessonsList lessons={lessons} title="Nuestro clases" />
    </div>
  );
}
