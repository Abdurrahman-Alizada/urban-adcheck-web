import React, { use } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import {AnimatedTooltip} from '../ui/animated-tooltip';

function CTA() {

  const router =useRouter();
  const people = [
    {
      id: 1,
      alt:"Person-Smiling",
      image: "/Avatar.png",
    },
    {
      id: 2,
      alt:"Person-Smiling",
      image: "/Avatar-2.png",
    },
    {
      id: 3,
      alt:"Person-Smiling",
      image: "/Avatar-3.png",
    },
  ];
  return (
   <section className='w-full min-h-[200px] mx-auto bg-[#F9FAFB] pt-12 pb-12'>
          {/* section title */}
          <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
          <h2 className='text-center font-Archivoo font-black text-[20px] md:text-[30px] lg:text-[39.57]'>Still have questions?</h2>
          <p className='text-[#585858] px-3 text-center font-nunitosans font-normal text-[16px]'>Still have questions? Our team is here to help—reach out to us anytime!
          </p>
          <div className='flex justify-center mt-4'>
          <button
          onClick={()=> router.push('/contact')}
          className="text-[15.2px]  font-Archivoo w-[146px] py-2  rounded-md bg-primary text-white">
             Contact Us
           </button>
          </div>
   </section>
  )
}

export default CTA
