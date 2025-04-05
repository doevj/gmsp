import { Slider } from '@/common/components';
import Image from 'next/image';
import React, { FC } from 'react';

const reviews = [
  {
    name: 'Ivan Baroslov',
    text: 'Increíble experiencia! Aprendí tanto en tan poco tiempo',
    imageUrl: '/media/img/test1.png',
  },
  {
    name: 'Jane Smith',
    text: 'This is another testimonial text',
    imageUrl: '/media/img/test2.jpg',
  }
];


const TestimonialItem: FC<{ name: string; text: string; imageUrl: string }> = ({ name, text, imageUrl }) => {
  return (
    <div className='scale-90 flex flex-col sm:flex-row gap-2 items-center justify-center w-[90%]'>
      <Image width={80} height={80} src={imageUrl} alt={name} className='rounded-full sm:mx-auto md:mx-0' />
      <h4 className='text-xl font-semibold text-teal-500'>{name}</h4>
      <p className='text-gray-600 text-2xl font-serif'> &quot;{text}&quot;</p>
    </div>
  );
};

export const Testimonials: FC = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center p-10 bg-[#f9f9f9] rounded-lg shadow-lg mb-10 font-nunito '>
      <div className='max-w-[700px]'>
        <Slider >
          {reviews.map((item) => {
            return <TestimonialItem key={item.name} {...item} />;
          })}
        </Slider>
      </div>
    </div>
  );
};
