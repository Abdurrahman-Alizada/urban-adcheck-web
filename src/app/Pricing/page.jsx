'use client';
import React from 'react'
import Header from '@/components/Header/page'
import ProductPricing from '@/components/productPricing/page'
import Footer from '@/components/Footer/page'
import PackageLoader from '@/components/contentLoader/PackagesLoader/page';
import { useGetAllPackagesQuery } from '@/redux/reducers/package/packageThunk';
import { useGetCurrentLoginUserQuery } from '@/redux/reducers/user/userThunk';

function Pricing() {
        const {data,isLoading,isFetching,isError,error}=useGetAllPackagesQuery();
        
        
  return (
    <div className='mt-16 mb-12'>
        {  
          (isLoading || isFetching) ? Array.from({ length: 2 }).map((_, index) => (              
               <div className='flex' key={index}>
               <PackageLoader  />
              </div>
              
          ))
          :
         <ProductPricing packages={data?.data}/>  
        }
       
    </div>
  )
}

export default Pricing
