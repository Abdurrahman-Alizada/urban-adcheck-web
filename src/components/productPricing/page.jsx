'use client';
import React from 'react'
import PriceCard from '../priceCard/page';
import Image from 'next/image';
import PackageLoader from '../contentLoader/PackagesLoader/page';

function ProductPricing({packages,isLoading}) {

      return (
    <section className='w-full h-auto mx-auto p-4 md:p-10 lg:px-12 lg:py-0 '>
          <h2 className='text-center font-nunitosans font-bold text-[20px] md:text-[30px] lg:text-[38.57]'>Product <span className='text-primary'>Offering</span></h2>
          <div className='w-full mx-auto mt-10 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 lg:px-[200px] '>
            {  isLoading ? Array.from({ length: 2 }).map((_, index) => (
              <PackageLoader key={index} />
            ))
                :
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

