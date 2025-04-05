// import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Video, Testimonials } from './(components)';
import { lessons } from './mocks';
import { Button, LessonsList } from '@/common/components';


function MainView() {
  // const t = useTranslations('Home');
  return (
    <div className="relative w-4/6 min-w-[320px] max-w-[900px] mx-auto flex flex-col items-center justify-center text-white text-center p-10 bg-teal-600 bg-opacity-40 rounded-3xl">
      <Image src="/media/svg/logo-white.svg" height={500} width={500} alt='logo' />
      <p className="md:text-4xl mt-4">The best way to learn</p>
      <button className="mt-6 px-6 py-3 border border-white rounded-lg text-lg font-medium hover:bg-white hover:text-black transition-all">
        {'Start Learning'}
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className="w-full p-10 relative ">
        <Video />

        <MainView />

        <div className="mb-20" />

      </div>

      <div className="mb-10" />

      <LessonsList lessons={lessons} title="Choose your way" />

      <Testimonials />

      <div className='h-[200px] mb-7 flex flex-col items-center justify-center mt-4 bg-teal-600/80 text-white py-8 px-8 text-4xl font-bold font-nunito no-underline'>
        <h4> Schedule your free trial class</h4>
        <Button className="mt-6 px-6 py-3 border border-white rounded-lg text-lg font-medium hover:bg-white hover:text-teal-500 transition-all">Book now</Button>
      </div>
    </>
  );
}
