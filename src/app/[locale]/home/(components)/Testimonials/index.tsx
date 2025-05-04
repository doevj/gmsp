import React, { FC } from 'react';
import Image from 'next/image';
import { Slider } from '@/common/components';
import { reviews } from '@/data/reviews';

const TestimonialItem: FC<{ name: string; text: string; imageUrl: string }> = ({ name, text, imageUrl }) => {
  return (
    <div className='scale-90 flex flex-col sm:flex-row gap-2 items-center justify-center w-[90%]'>
      <Image width={90} height={90} src={imageUrl} alt={name} className='max-h-[90px] max-w-[90px] min-h-[90px] min-w-[90px] object-cover rounded-full sm:mx-auto md:mx-0' />
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
