'use client'
import React, { FC, useRef, useState } from 'react'
import chevronDown from './chevron-down.svg'
import Image from 'next/image';

type AccordionItem = {
  title: string;
  content: string[];
};


export const DropDownSelector: FC<{ items: AccordionItem[] }> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className=" bg-white rounded-md shadow border">
      {items.map((item, index) => (
        <div key={index} className="border-b">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full text-left px-4 py-3 font-medium text-black hover:bg-blue-50 flex justify-between items-center"
          >
            {item.title}
            <Image
              src={chevronDown}
              width={19}
              height={19}
              alt='chevron'
              className={activeIndex === index ? 'rotate-180 transition-transform' : 'rotate-0 transition-transform'}
            />
          </button>

          <div
            //@ts-expect-error
            ref={el => (contentRefs.current[index] = el)}
            style={{
              maxHeight:
                activeIndex === index
                  ? `${contentRefs.current[index]?.scrollHeight}px`
                  : '0px',
            }}
            className={`overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <div className="px-6 pb-4 pt-2 text-gray-700">
              <ul className="list-disc pl-5">
                {item.content.map((line, i) => (
                  <li className='text-start border-b py-2' key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
