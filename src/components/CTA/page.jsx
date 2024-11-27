import React from 'react'
import Image from 'next/image'

function CTA() {
  return (
   <section className='w-full min-h-[200px] mx-auto bg-[#F9FAFB] pt-12 pb-12'>
          {/* section title */}
          <div className="flex justify-center relative">
                {/* First Image */}
                <div className="relative z-10">
                    <Image
                    src="/avatar-3.png"
                    width={40}
                    height={40}
                    alt="Profile Image"
                    className=""
                    />
                </div>

                {/* Second Image */}
                <div className="relative z-20 -ml-3 -mt-1">
                    <Image
                    src="/avatar-2.png"
                    width={45}
                    height={45}
                    alt="Profile Image"
                    className=""
                    />
                </div>

                {/* Third Image */}
                <div className="relative z-10 -ml-3">
                    <Image
                    src="/avatar.png"
                    width={40}
                    height={40}
                    alt="Profile Image"
                    className=""
                    />
                </div>
          </div>

          <h2 className='text-center font-Archivoo font-black text-[20px] md:text-[30px] lg:text-[39.57]'>Still have questions?</h2>
          <p className='text-[#585858] px-3 text-center font-nunitosans font-normal text-[16px]'>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
          <div className='flex justify-center mt-4'>
          <button className="text-[15.2px]  font-Archivoo w-[146px] py-2  rounded-md bg-primary text-white">
             Contact Us
           </button>
          </div>
   </section>
  )
}

export default CTA
