import React from 'react';
import Image from 'next/image';

export default function WhatYouCanDo() {

  
  const WhatYouCanDoData = [
    { title: 'Accurate Ad Verification', image: '/graph_icon.png', content: 'Ensure your advertising displays are always visible, functional, and well-maintained.', alt: 'graph_icon' },
    { title: 'On-Demand Billboard Inspections', image: '/financial_icon.png', content: 'Connect businesses with real-time insights through a network of dedicated watchdogs.', alt: 'financial_icon' },
    { title: 'Smart Display Monitoring', image: '/market_icon.png', content: 'Urban AdCheck’s platform tracks performance to offer quantitative and qualitative insights.', alt: 'market_icon' }
  ];

  return (
    <section className='w-full mx-auto p-3 md:p-4 lg:p-12 flex flex-col justify-center'>
      <h2 className='text-center font-nunitosans font-bold text-[20px] md:text-[30px] lg:text-[39.57]'>What You Can Do With<span className='text-primary'> Urban AdCheck
      </span></h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 place-items-center md:grid-cols-3 mt-6 gap-4 md:gap-6 lg:gap-12'>
        {WhatYouCanDoData.map((item, index) => (
          <div key={index} className='flex flex-col gap-3 items-center justify-center'>
            <Image src={item.image} width={100} height={100} className='object-contain' alt={item.alt} />
            <h3 className='text-primary font-bold'>{item.title}</h3>
            <p className='text-[#585858] px-3 text-center font-nunitosans font-normal text-[16px]'>{item.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
