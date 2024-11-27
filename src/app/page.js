import Hero from "./Components/Hero/page";
import Clients from "./Components/clients/page";
import ProductPricing from "@/components/productPricing/page";
import WhatYouCanDo from "./Components/whatYouCanDo/page";
import ContactHome from "./Components/Contact/page";
import Testimonials from "@/components/testimonials/page";
import FAQ from "@/components/Faq/page";
import Footer from "@/components/Footer/page";
import CTA from "@/components/CTA/page";

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
