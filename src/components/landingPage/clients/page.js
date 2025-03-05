import React from 'react'
import Image from 'next/image'


function Clients() {
  return (
    <section className='w-full  px-3 md:px-[50px] lg:px-[80px] py-[25px] md:py-[40px] lg:py-[50px] flex flex-col md:flex-row justify-between md:items-center lg:items-start'>

        {/* left side */}
        <div className='w-full md:w-1/2'>
        <hr className="w-36 border-primary border-t-[4px]" />
        <p className="max-w-[480px] text-[#515151] font-nunitosans font-bold text-[16px] md:text-[18px] lg:text-[23.34px] mb-6 leading-6 md:leading-8">
        Find out why businesses trust Urban AdCheck to enhance their ad visibility and effectiveness!
        </p>
        </div>

        {/* right side Logos section*/}
        <div className='w-full md:w-1/2 flex flex-wrap items-center lg:flex-nowrap justify-between'>
        <Image
            src="/client-1.png"
            width={88}
            height={72}
            alt="Plus Icon"
            className="object-contain mr-2 w-[66px] h-[54px] md:w-[76px] md:h-[64px] lg:w-[88px] lg:h-[72px] "
          />
          <Image
            src="/client-2.png"
            width={88}
            height={72}
            alt="Plus Icon"
            className="object-contain mr-2 w-[66px] h-[54px] md:w-[76px] md:h-[64px] lg:w-[88px] lg:h-[72px]"
          />
          <Image
            src="/client-3.png"
            width={88}
            height={72}
            alt="Plus Icon"
            className="object-contain mr-2 w-[66px] h-[54px] md:w-[76px] md:h-[64px] lg:w-[88px] lg:h-[72px]"
          />
          <Image
            src="/client-4.png"
            width={88}
            height={72}
            alt="Plus Icon"
            className="object-contain mr-2 w-[66px] h-[54px] md:w-[76px] md:h-[64px] lg:w-[88px] lg:h-[72px]"
          />
        </div>

    </section>
  )
}

export default Clients
