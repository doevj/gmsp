import { Button } from '@/common/components';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const methodologyItems = [
  {
    imgUrl: '/media/svg/trial-class.svg',
    title: 'Personalized',
    description: 'Each student is different, with unique interests, goals, and ways of learning. That’s why our approach starts with getting to know you: we assess your needs and design a learning plan tailored to you.'
  },
  {
    imgUrl: '/media/svg/pair-classes.svg',
    title: 'Flexible',
    description: 'We don’t sell an innovative methodology as the only solution because we understand that student diversity requires flexibility. We combine modern tools with traditional methods to make the most of each approach.'
  },
  {
    imgUrl: '/media/svg/group-classes.svg',
    title: 'Student-Centered',
    description: 'Learning revolves around you. We adapt to your pace, your goals, and your learning style so you can progress effectively and enjoy the process. Learning Spanish shouldn’t be standardized—it should be personalized.'
  },
];

const AboutPage: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations('About');

  return (
    <div className="relative w-full bg-teal-500">
      <div className='w-[100vw] h-full flex flex-col lg:flex-row items-center md:items-start gap-20 justify-center py-[5rem] px-5 md:px-40 mb-[15rem]'>
        <div className='flex flex-col overflow-visible'>
          <div className='flex flex-col gap-2 mb-7'>
            <h1 className='font-bold text-white text-3xl md:text-4xl max-w-[300px] font-serif'>{t('title')}</h1>
            <h1 className='font-bold text-white text-3xl md:text-4xl max-w-[300px] font-serif'>{t('subtitle')}</h1>
          </div>
          <p className='md:max-w-[500px] md:min-w-[300px] md:text-xl font-nunito overflow-visible'>{t('message')}</p>
        </div>

        <div className='rounded-3xl overflow-hidden shadow-lg shadow-grey-900 sm:mt-auto'>
          <Image height={350} width={350} src={'/media/img/img-about.jpg'} alt='portrait' className='rounded-3xl' />
        </div>
      </div>

      <div className='flex flex-col gap-5 items-center mb-20'>
        <h1 className='text-3xl text-white font-nunito uppercase'>{t('methodology')}</h1>

        <div className='flex flex-wrap gap-10 w-full items-center justify-center' >
          {methodologyItems.map((item, index) => (
            <div key={index} className='shadow-md bg-teal-800/50 rounded-2xl flex flex-col gap-2'>
              <Image
                src={item.imgUrl}
                alt="Illustration"
                height={200}
                width={300}
                className="max-w-[100%] max-h-[200px] min-w-[100%] min-h-[200px] object-cover mx-auto rounded-t-2xl opacity-85 bg-white"
              />
              <div className="p-5">
                <h2 className="text-lg mb-4 uppercase font-nunito text-center text-white">{item.title}</h2>
                <p className=" max-w-[290px] font-nunito text-white">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='w-full flex flex-wrap sm:gap-10 items-center justify-center mb-20 md:p-10'>
        <Link href={`/${locale}/contacts`}>
          <Button className='py-4 px-6 sm:py-4 sm:px-6 bg-gray-100/30 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 hover:text-white'>{t('Lets connect!')}</Button>
        </Link>
        {/* <Button className='py-4 px-6 sm:py-4 sm:px-6 bg-gray-100/30 text-white font-bold rounded-lg shadow-md hover:bg-teal-600 hover:text-white'>{t('Test your level')}</Button> */}
      </div>

      <div className=' w- flex flex-col items-center justify-center mt-4 bg-white py-10 px-8 text-4xl font-bold font-nunito no-underline mb-20'>
        <h4 className='text-teal-600 mb-2'>{t('Schedule your free trial class')}</h4>
        <Link href={`/${locale}/contacts`}>
          <Button className="mt-6 px-6 py-3 border text-teal-600 border-teal-600 rounded-lg text-lg font-medium hover:bg-teal-600 hover:text-white transition-all ">
            {t('Book now')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;