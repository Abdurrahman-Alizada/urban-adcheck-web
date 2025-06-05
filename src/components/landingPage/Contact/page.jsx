import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ContactHome() {
  const router=useRouter();

  return (
    <section className='w-full mx-auto p-4 md:p-6 lg:px-14 flex justify-center flex-col md:flex-row mt-10'>
      <div>
        <Image src={'/contactHome.png'} width={600} height={600} alt='contact-agent' className='object-contain'/>
      </div>
      <div className='flex flex-col gap-2 lg:mt-[100px]'>
        <h2 className='font-nunitosans font-semibold text-[20px] md:text-[30px] lg:text-[32.57]'>24/7 Customer Support</h2>
        <hr className='w-12 border-primary border-t-[4px]' />
        <p className='max-w-[463px] text-[#585858] font-nunitosans font-normal text-[16px]'>
          Our team is committed to providing the best customer service. Whether you have a question or need assistance, we are here to support you during business hours. Connect with us via live chat, email, or through our knowledge base!
        </p>
        <button 
        onClick={()=> router.push('/contact')}
        className='text-[15.2px] font-Archivoo w-[146px] py-2 rounded-md bg-primary text-white'>
          Contact Us
        </button>
      </div>
    </section>
  );
}
