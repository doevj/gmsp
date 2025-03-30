"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ReactNode } from "react";

type Props = {
  items: ReactNode[];
}

export const Slider: React.FC<Props> = ({ items }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        // autoplay={{ delay: 3000 }}
        loop
        className="rounded-2xl shadow-lg h-[110px]"
      >
        <div className="mt-10 mb-20">
          {items.map((Item, ix) => (
            <SwiperSlide key={ix}>
              {Item}
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};
