'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image from 'next/image';


const testimonials = [
  {
    title: 'Incredible Opportunities for Job Seekers',
    text: 'Urban Adcheck helped me secure a position perfectly matching my skills and experience. The job recommendations were tailored to my profile, and the application process was smooth and user-friendly.',
    name: 'John Peterson',
    role: 'Graphic Designer',
    image: '/testimonials-3.png',
    imageAlt: 'John Peterson working on a design tablet at his desk',
    rating: 4.8,
  },
  {
    title: 'The Perfect Hiring Tool for Publishers',
    text: 'As a job publisher, I’m thrilled with the features Urban Adcheck offers. Posting roles and tracking applicants has never been easier. It’s made finding quality candidates so simple.',
    name: 'Sophia Martinez',
    role: 'Recruitment Consultant',
    image: '/testimonials-4.png',
    imageAlt: 'Sophia Martinez in a conference room holding a tablet',
    rating: 5.0,
  },
  {
    title: 'A Game-Changer for Job Seekers',
    text: 'I landed a fantastic role within a month of signing up on Urban Adcheck. The personalized notifications and helpful tips made the process so much easier than I expected.',
    name: 'Chloe Brown',
    role: 'Sales Executive',
    image: '/testimonials-6.png',
    imageAlt: 'Chloe Brown smiling at a coffee shop with a laptop open',
    rating: 4.9,
  },
  {
    title: 'Efficient and Professional',
    text: 'We found exceptional candidates quickly and easily using Urban Adcheck. The platform is intuitive, and the support team is always there when needed.',
    name: 'Ambra Clark',
    role: 'Recruitment Manager',
    image: '/testimonials-5.png',
    imageAlt: 'Anthony Clark discussing with colleagues in a bright office',
    rating: 5.0,
  },
];




const Testimonials = () => (
  <section className="h-[33rem] w-full dark:bg-black bg-white   dark:bg-dot-white/[0.2] bg-dot-black/[0.2]   mb-[100px]">
    {/* Testimonials Header */}
    <div className="text-center flex justify-center items-center flex-col pt-10">
      <p className="text-primary text-[16px] md:text-[24px] leading-6 md:leading-9 mb-3">
        See Our Review
      </p>
      <h2 className="text-black font-extrabold text-[29.86px] lg:text-[49.86px] font-Archivoo leading-7 lg:leading-[60px] mb-5">
        What Our Users Say About Us
      </h2>
    </div>

    {/* Swiper Slider */}
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop={true}
      speed={5000}
      spaceBetween={20}
      slidesPerView="auto"
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide
          key={index}
          className="cursor-pointer m-4 mt-8 p-3 min-h-[230px] rounded-lg shadow-md bg-white"
        >
          <div>
            <h2 className="text-[#1B1C57] font-semibold mb-5 text-[16px] lg:text-[18px] font-lexendexa leading-5 lg:leading-8">
              {testimonial.title}
            </h2>
            <p className="text-[#626687] font-lexendexa text-[14px] leading-3 lg:leading-5 mb-3">
              {testimonial.text}
            </p>
          </div>
          <div className="flex justify-between">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <Image
                src={testimonial.image}
                alt={`Photo of ${testimonial.name}`}
                width={62}
                height={62}
                style={{ objectFit: 'cover' }}
                className="rounded-full"
              />
              <div className="flex flex-col gap-2">
                <span className="font-lexendexa leading-tight font-medium text-[14px]">
                  {testimonial.name}
                </span>
                <span className="font-nunitosans leading-tight font-light text-[14px] text-[#888B97]">
                  {testimonial.role}
                </span>
              </div>
            </div>
            {/* Rating */}
            <div className="flex items-center gap-2">
              <Image
                src="/star.png"
                alt="Star rating icon"
                width={32}
                height={32}
                style={{ objectFit: 'cover' }}
                className="rounded-full"
              />
              <span className="font-bold">{testimonial.rating}</span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default Testimonials;
