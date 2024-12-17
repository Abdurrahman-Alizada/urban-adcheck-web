'use client';
import Hero from "../components/landingPage/Hero/page";
import Clients from "../components/landingPage/clients/page";
import ProductPricing from "@/components/productPricing/page";
import WhatYouCanDo from "../components/landingPage/whatYouCanDo/page";
import ContactHome from "../components/landingPage/Contact/page";
import FAQ from "@/components/Faq/page";
import CTA from "@/components/CTA/page";
import Testimonials from "@/components/landingPage/TestimonialsSlider/page";

export default function Home() {
  return (
    <div>
      <main >
           <Hero/>
           <Clients/>
           <ProductPricing/>
           <WhatYouCanDo/>
           <ContactHome/>
           <Testimonials/>
           <FAQ/>
           <CTA/>
           
       </main>
    </div>
  );
}
