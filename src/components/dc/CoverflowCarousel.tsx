import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import type { ReactNode } from "react";

type Props<T> = {
  items: T[];
  render: (item: T, index: number) => ReactNode;
  autoplay?: boolean;
};

export function CoverflowCarousel<T>({ items, render, autoplay = true }: Props<T>) {
  return (
    <Swiper
      className="dc-coverflow !pb-16"
      modules={[EffectCoverflow, Pagination, Autoplay]}
      effect="coverflow"
      centeredSlides
      loop
      grabCursor
      speed={800}
      autoplay={autoplay ? { delay: 3800, disableOnInteraction: false } : false}
      pagination={{ clickable: true }}
      coverflowEffect={{ rotate: 18, stretch: 0, depth: 200, modifier: 1.5, scale: 0.9, slideShadows: false }}
      slidesPerView={1.25}
      breakpoints={{
        640: { slidesPerView: 1.6 },
        768: { slidesPerView: 3 },
        1280: { slidesPerView: 5 },
      }}
    >
      {items.map((item, i) => (
        <SwiperSlide key={i} className="!h-auto">
          {render(item, i)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
