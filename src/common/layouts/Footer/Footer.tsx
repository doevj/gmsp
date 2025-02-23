import { FC } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const mockItems = [
  [
    { text: 'Home', url: '/home' },
    // { text: 'About', url: '/about' },
    { text: 'Classes', url: '/checkout' },
  ],
  // [
  //   { text: 'Item 4', url: '/item4' },
  // ]
]

export const Footer: FC = () => {
  const locale = useLocale();
  return (
    <footer className="bg-gray-800 text-gray-300 p-6 flex align-start justify-start items-start min-h-[210px]">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-5">
        {mockItems.map((column, ix) => (
          <div key={ix} className='flex flex-col gap-3'>
            {column.map((item, index) => (
              <p key={index}>
                <Link href={`/${locale}${item.url}`}>{item.text}</Link>
              </p>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}