import React from 'react'
import Image from 'next/image'
import { text } from '@fortawesome/fontawesome-svg-core';

function PriceCard({id,title,price,btn,features,bgClass,bgImage}) {
    const isSecondCard=id==2;
    const textColor = isSecondCard ? 'text-white' : 'text-primary';
    const startingAtTextColor = isSecondCard ? 'text-white' : 'text-gray-500'; // "starting at" text color
    const featureText=isSecondCard? 'text-white': 'text-[#162B60]'

  return (
    <div className={`${bgClass} shadow-md py-4 px-4 rounded-[10px]`} style={{
        backgroundImage: bgImage || 'none', // Apply background image if available
        backgroundSize: 'contain',
        backgroundRepeat:"no-repeat",
        backgroundPosition: 'right',
      }}

    >
         <h2 className={`${textColor} font-semibold text-[28.59px] font-Archivoo leading-relaxed`}>{title}</h2>
         <span className={`${startingAtTextColor} text-[16.2px] font-Archivoo`}>Starting at</span>
         <div className='mt-6'>
          <h3 className={`${textColor} text-[46px] font-Archivoo font-semibold leading-10`}>{price} <sub className='text-[12px]'>/ year</sub></h3>
          <span className={`${textColor} text-[16px] font-Archivoo font-normal`}>Annual Subscribtion</span>
         </div>
         <div className='w-full mt-6'>
           <button className="text-[15.2px] font-Archivoo px-8 py-2 rounded-[10px] bg-primary text-white">
             {btn}
           </button>
         </div>
         <ul className="text-left mt-6">
           {features.map((feature, index) => (
             <li key={index} className={`${featureText} flex items-center font-Archivo mb-2 font-normal text-[17.15px]`}>
               <Image
                 src="/check.png"
                 width={17.59}
                 height={17.59}
                 alt="Check icon"
                 className="object-contain mr-2"
               />
               {feature}
             </li>
           ))}
         </ul>
    </div>
  )
}

export default PriceCard
