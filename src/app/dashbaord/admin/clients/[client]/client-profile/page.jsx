import React from 'react';
import Image from 'next/image';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiPhone } from "react-icons/pi";
import { TbMail } from "react-icons/tb";



function ClientProfile() {
   
   
      const cardsData = [
        {
          title: 'Posted jobs',
          jobs: '43',
          image: '/posted-jobs.png',
          alt: 'posted-jobs',
          
        },
        {
            title: 'In progress',
            jobs: '23',
            image: '/in-progress.png',
            alt: 'posted-jobs',
          },
        {
            title: 'Pending jobs',
            jobs: '43',
            image: '/pending-jobs.png',
            alt: 'pending-jobs',
          },
        {
          title: 'Completed jobs',
          jobs: '23',
          image: '/Completed-jobs.png',
          alt: 'completed-jobs',
        },
        
      ];

      const contactDetails = [
        
          { icon: <TbMail size={25} color='#4B465C'/>, text: 'info@domain.com' },
          { icon: <PiPhone size={25} color='#4B465C'/>, text: '+123 456 789' },
          { icon: <HiOutlineLocationMarker size={30} color='#4B465C'/>, text: 'Islamabad Co Operative Housing Society, Street 4,Sector B, Phase 8 Phase 8 Bahria Town, Rawalpindi' },

        ];

  return (
    <div className='mt-16'>
            
            {/* profile head section */}
            <div>
               <div className='flex gap-2'>
                    <Image
                       src={'/client-profile.png'}
                       width={75}
                       height={75}
                       alt={'profile image'}
                       className="rounded-md"
                       />
                       <div className='flex flex-col items-start'>
                        <h2 className="text-gray-700 text-[18px] lg:text-[20px] font-extrabold font-Archivoo">
                          Josep Roger
                        </h2>
                        <span className=" text-black text-[14px] rounded-[20px]">
                         4.2 <Image
                             src={'/4-stars.png'}
                             width={63}
                             height={12}
                             alt={'4-stars'}
                             className="rounded-md inline-block"
                       />
                        </span>
                       </div>
                       
               </div>
               <p className='p-2 lg:w-[87%] mt-2 text-[15.03px] font-nunitosans leading-[22px] from-neutral-400 text-[#767E94] '>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been  the industry&apos;s
               standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been  the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
               took a galley of  type and scrambled it to make a type specimen book</p>
            </div> 

            {/* Cards Section */}
            <section className="p-2 lg:p-0 mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {cardsData.map((card, index) => (
                      <div
                        key={index}
                        style={{ backgroundColor: card.bgColor }}
                        className="flex justify-between gap-2 items-center rounded-lg px-3 py-6 border-[1px] "
                      >
                        <div className="flex flex-col">
                          <span className="text-xl font-semibold">{card.jobs}</span>
                          <span className="text-gray-500 text-[16px]">{card.title}</span>
                        </div>
                        <Image
                          src={card.image}
                          width={58}
                          height={58}
                          alt={card.alt}
                          className="object-contain"
                        />
                      </div>
                    ))}
            </section>
             {/* contact details */}
            <div className='mt-16 space-y-4 lg:space-y-2 p-2 lg:p-0'>
              {contactDetails.map((contact, index) => (
                <div key={index} className='flex items-center gap-2 '>
                   
                   {contact.icon}
                   <span className='text-[#4B465C] font-NotoSans text-[15px]'>{contact.text}</span>
                </div>
              ))}
            </div> 
            {/* website details */}
            <div className='w-[90%] md:w-[80%] mt-16 p-2 lg:p-0'>
                 <div className='border-b-[1px] py-3 mb-4'>
                 <span className='text-[#4B465C] font-NotoSans text-[16px] font-semibold'>Website</span>
                 <a href="#" className='text-[#4B465C] block font-NotoSans text-[14px]'>www.info.com</a>
                 </div>
                 <div className='border-b-[1px] py-4 mb-4'>
                 <span className='text-[#4B465C] font-NotoSans text-[16px] font-semibold'>Industry</span>
                 <span className='text-[#4B465C] block font-NotoSans text-[14px]'>IT Services and IT Consulting</span>
                 </div>
                 <div className='border-b-[1px] py-4 mb-4'>
                 <span className='text-[#4B465C] font-NotoSans text-[16px] font-semibold'>Headquarters</span>
                 <span className='text-[#4B465C] block font-NotoSans text-[14px]'>Silicon Roundabout, UK</span>
                 </div>
            </div>
    </div>
  )
}

export default ClientProfile
