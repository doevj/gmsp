import { useLocale } from 'next-intl';
import Link from 'next/link';
import { FC } from 'react'

type Lesson = {
  title: string;
  description: string;
  color: string; // bg color
}

type LessonsListProps = {
  title: string;
  lessons: Lesson[];
}

export const LessonsList: FC<LessonsListProps> = ({ title, lessons }) => {
  const locale = useLocale();

  return (
    <div className="bg-gray-50 py-10">
      {/* Title */}
      <h2 className="text-center text-3xl font-bold text-yellow-600 mb-8">
        {title}
      </h2>

      {/* Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-lg overflow-hidden ${lesson.color} `}
          >
            <div className="p-6 text-center flex flex-col gap-3 h-full">
              <h3 className="text-xl font-bold mb-4">{lesson.title}</h3>
              <p className="text-sm text-gray-700 mb-4">{lesson.description}</p>

              <Link className='mt-auto' href={`/${locale}/checkout`} >
                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Me interesa
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
