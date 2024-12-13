'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

const TestimonialsSlider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <div>Testimonial 1</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>Testimonial 2</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>Testimonial 3</div>
      </SwiperSlide>
    </Swiper>
  );
};

export default TestimonialsSlider;
