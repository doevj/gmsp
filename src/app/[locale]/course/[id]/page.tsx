import { FC } from "react";
import { DropDownSelector } from "@/common/components";
import { getCourseData } from '@/data/courses';
import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>
}
export default async function CoursePage({ params }: Props) {
  const { id } = await params;
  if (redirectRoutes.includes(id)) {
    return <RedirectPage />
  }
  const courseData = await getCourseData(id);
  if (!courseData) {
    return (
      <NotFoundView />
    )
  }

  return (
    <div className="w-full relative ">
      <div className="mb-10" />
      <div className="flex flex-col gap-2 items-center justify-center text-center bg-gray-100/90 p-10">
        <h1 className="text-4xl font-bold uppercase">{courseData.title}</h1>
        <h2 className="text-2xl font-bold text-teal-600 uppercase">{courseData.subtitle}</h2>
        <p className="text-lg">{courseData.description}</p>
      </div>
      <div className="mb-10" />
      <div className="flex flex-col md:flex-row gap-2 items-start justify-center text-center p-10">
        <div className="w-full">
          <DropDownSelector
            items={[
              { content: courseData.whatLearn, title: 'What will you learn?' },
              { content: courseData.whosFor, title: 'Who\'s is this class for?' },
              { content: courseData.whatTopics, title: 'What topics will be covered?' },
              { content: courseData.whyChoose, title: 'Why choose this course?' },
            ]}
          />
        </div>
        <ul className="bg-teal-500 text-white font-semibold text-lg rounded px-10 py-6 space-y-4 w-full">
          {courseData.pros.map((line, index) => (
            <li key={index} className="list-disc ml-4">{line}</li>
          ))}
        </ul>
      </div>

      <div className="mb-10" />

      <SpanishClassCards title={courseData.title} />

      <div className="mb-10" />

      <SpanishBundleCards />

    </div>
  );
}

const NotFoundView: FC = () => {
  const t = useTranslations('general');
  return <div className="p-10 text-center text-2xl font-bold mt-10">
    {t('notFound')}
  </div>
}

const redirectRoutes = [
  'individual_classes',
  'pair_classes',
  'group_classes',
  'trial_class'
]

const RedirectPage = () => {
  const locale = useLocale();
  redirect(`/${locale}/courses`)
}


const SpanishClassCards: FC<{ title: string }> = ({ title }) => {
  const locale = useLocale();
  const classes = [
    {
      title: `${title} Individual Class`,
      duration: "1 hour",
      price: "€23",
    },
    {
      title: `${title} Pair Class`,
      duration: "1 hour",
      price: "€17",
    },
    {
      title: `${title} Group Class`,
      duration: "1 hour",
      price: "€14",
    },
  ];

  return (
    <div className="bg-teal-50 py-10 px-4 flex justify-center items-center gap-8 flex-wrap">
      {classes.map((cls, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md p-8 w-80 text-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
        >
          <h2 className="text-xl font-semibold mb-4 uppercase text-gray-800">
            {cls.title}
          </h2>
          <p className="text-gray-600 mb-2">Duration: {cls.duration}</p>
          <p className="text-gray-600 mb-6">Price: {cls.price}</p>
          <Link href={`/${locale}/checkout`} >
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg text-lg">
              Book my Class
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

const SpanishBundleCards: FC = () => {
  const bundles = [
    {
      title: "10 Individual Classes",
      price: "€200",
    },
    {
      title: "10 Pair Classes",
      price: "€140",
    },
    {
      title: "10 Group Classes",
      price: "€170",
    },
  ];

  return (
    <div className="bg-gray-100/50 py-12 px-4 text-center">
      <h2 className="text-2xl font-semibold text-gray-900">Go further for less</h2>
      <div className="flex justify-center items-center gap-8 flex-wrap p-10">
        {bundles.map((bundle, index) => (
          <div
            key={index}
            className="bg-teal-700 bg-opacity-50 rounded-2xl p-8 w-72 text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-4 leading-snug">
              {bundle.title}
            </h3>
            <p className="text-white text-2xl font-bold">{bundle.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}