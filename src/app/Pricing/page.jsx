'use client';
import React from 'react'
import Header from '@/components/Header/page'
import ProductPricing from '@/components/productPricing/page'
import Footer from '@/components/Footer/page'
import { useGetAllPackagesQuery } from '@/redux/reducers/package/packageThunk';
// import { useGetAllPackagesQuery } from '@/redux/reducers/package/packageThunk'

function Pricing() {
        const {data,isLoading}=useGetAllPackagesQuery();
        console.log(data)
  return (
    <div className='mt-16 mb-12'>
          
         <ProductPricing packages={data?.data} isLoading={isLoading}/>  
       
    </div>
  )
}

export default Pricing
