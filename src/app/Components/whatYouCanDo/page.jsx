import React from 'react'
import Image from 'next/image'


export default function WhatYouCanDo() {

    const WhatYouCanDoData=[
        {
       
            title:"A",
            image:"/graph_icon.png",
            content:"Our Business Plan is a written document describing a company’s core business activities."
            ,
            alt:"graph_icon"
        },
        {
        id:1,
        title:"B",
        image:"/financial_icon.png",
        content:"Our expert team sensible decision about their money, to ensure they achieve the life goals. A financial plan."
        ,
        alt:"financial_icon"    
    },

        {
      
        title:"C",
        image:"/market_icon.png",
        content:"A market analysis is a quantitative and qualitative assessment of a market. It looks into the size of the market."
        ,
        alt:"market_icon"      
    }
    ]

  return (
       <section className='w-full mx-auto p-3 md:p-4 lg:p-12  flex flex-col justify-center'>
         <h2 className='text-center font-nunitosans font-bold text-[20px] md:text-[30px] lg:text-[39.57]'>What you <span className='text-primary'>can do?</span></h2>
         <div className=' grid grid-cols-1 sm:grid-cols-2 place-items-center md:grid-cols-3  mt-6 gap-4 md:gap-6 lg:gap-12'>
         {
                WhatYouCanDoData.map((todo,index)=>(
                      <div key={index} className='flex flex-col gap-3 items-center justify-center'>
                          <Image src={todo.image} width={100} height={100} className='object-contain'/>
                          <h3 className='text-[#2B3377] font-bold'>{todo.title}</h3>
                          <p className='text-[#585858] px-3 text-center font-nunitosans font-normal text-[16px]'>{todo.content}</p>
                      </div>
                ))
            }
         </div>
       </section>
  )
}
