'use client';
import React from 'react'
import PriceCard from '../priceCard/page';
import Image from 'next/image';

function ProductPricing({packages,isLoading}) {

      return (
    <section className='w-full h-auto mx-auto mt-5 p-4 md:p-10 lg:px-12 lg:py-0 '>
          <h2 className='text-center font-nunitosans font-bold text-[20px] md:text-[30px] lg:text-[38.57]'>Our <span className='text-primary'> Product Offering          </span></h2>
          <div className='w-full mx-auto mt-10 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 lg:px-[160px] '>
            {
                packages?.length && packages?.map((Package, index) => (
                    <PriceCard Package={Package} key={index}
                    // bgImage= "url('/bg-pricing.png')"
                     />
                ))
            }

          </div>
    </section>
  )
}

export default ProductPricing

