'use client'
import React, { FC, useRef, useState } from 'react'

type AccordionItem = {
  title: string;
  content: string[];
};

const accordionData: AccordionItem[] = [
  {
    title: 'What will you learn in this course?',
    content: [
      'Introducing yourself and greeting others',
      'Numbers, days, and months',
      'Ordering food, asking for directions and help',
      'Forming basic sentences in the present tense',
      'Essential day-to-day vocabulary',
    ],
  },
  { title: 'Who is this class for?', content: [] },
  { title: 'What topics will be covered?', content: [] },
  { title: 'Why choose this course?', content: [] },
];


export const DropDownSelector: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-md shadow">
      {accordionData.map((item, index) => (
        <div key={index} className="border-b">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full text-left px-4 py-3 font-medium text-black hover:bg-blue-50 flex justify-between items-center"
          >
            {item.title}
            <span>{activeIndex === index ? '▲' : '▼'}</span>
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
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
