'use client';
import Hero from "../components/landingPage/Hero/page";
import Clients from "../components/landingPage/clients/page";
import ProductPricing from "@/components/productPricing/page";
import WhatYouCanDo from "../components/landingPage/whatYouCanDo/page";
import ContactHome from "../components/landingPage/Contact/page";
import FAQ from "@/components/Faq/page";
import CTA from "@/components/CTA/page";
import Testimonials from "@/components/landingPage/TestimonialsSlider/page";
import { useGetAllPackagesQuery } from "@/redux/reducers/package/packageThunk";
import PackageLoader from "@/components/contentLoader/PackagesLoader/page";

export default function Home() {
       const {data,isLoading,isFetching}=useGetAllPackagesQuery();
  return (
    <div>
      <main >
           <Hero/>
           <Clients/>
           <div className='mt-16 flex justify-center gap-2 mb-12'>
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
           <WhatYouCanDo/>
           <ContactHome/>
           <Testimonials/>
           <FAQ/>
           <CTA/>
           
       </main>
    </div>
  );
}
