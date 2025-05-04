import Link from 'next/link';
import { FC } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { toSnakeCase } from '@/utils';

type Lesson = {
  title: string;
  description: string;
  imageUrl?: string;
  buttonText?: string;
}

type LessonsListProps = {
  title: string;
  lessons: Lesson[];
}

const LessonListItem: FC<Lesson> = ({ title, description, imageUrl, buttonText }) => {
  const locale = useLocale();
  return (
    <div className="bg-green-50 min-w-[320px] rounded-2xl shadow-md p-4 py-8 text-center border-teal-500 border-2 mx-auto flex flex-col items-center gap-3 cursor-pointer scale-90 hover:scale-[0.95] transition duration-300 overflow-x-hidden">
      <h2 className="text-xl mb-4 uppercase font-spectral font-semibold text-teal-600">{title}</h2>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Illustration"
          width={300}
          height={300}
          className="sm:max-w-[300px] sm:max-h-[300px] sm:min-w-[300px] sm:min-h-[300px] object-cover mx-auto"
        />
      )}
      <p className="text-gray-700 max-w-[290px]">{description}</p>
      <Link href={`/${locale}/course/${toSnakeCase(title)}`} className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 mt-auto scale-110" >
        {buttonText}
      </Link>
    </div>
  );
};

export const LessonsList: FC<LessonsListProps> = ({ title, lessons }) => {
  return (
    <div className="relative pb-10 z-10">
      <h1 className="text-center text-[2rem] md:text-[3.5rem] font-bold text-teal-600 mb-8 font-serif">
        {title}
      </h1>

      <div className="flex flex-wrap lg:flex-nowrap px-4 py-5 max-w-[1400px] mx-auto">
        {lessons.map((lesson, index) => (
          <LessonListItem key={index} {...lesson} />
        ))}
      </div>
    </div>
  );
};
