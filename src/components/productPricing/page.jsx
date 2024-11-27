import React from 'react'
import PriceCard from '../priceCard/page';

function ProductPricing() {

    const pricingPlans = [
        {
          id:1,
          title: "Price-per-job",
          price: "$19,50",
          btn:"Get Price Estimate",
          features: ['Data Migration', 'Simple Tax Preparation','Fund Administration','Fund Manager','Investor Records','Fund Manager',
          ],
          bgClass: 'bg-white',
        },
        {
          id:2,
          title: "Pro Plan",
          price: "$99,50",
          btn:"Get Price Estimate",
          features: ['Series of Entity Included','Bank Account','Investor Onboarding','Fund Manager','Regulatory Filings','Simple Tax Preparation'],
          bgClass: 'bg-[#162B60]',
          bgImage: "url('/bg-pricing.png')", // Background image for this card

        },
        {
          id:3,
          title: "Enterprise Plan",
          price: "$19,500",
          btn:"Get Price Estimate",
          features:  [ 'Data Migration','Simple Tax Preparation','Fund Administration','Fund Manager','Investor Records','Advanced Tax Strategy'],
          bgClass: 'bg-white',
        },
        {
          id:4,
          title: "Custom Plan",
          price: "$49,500",
          btn:"Get Price Estimate",
          features:  ['30 Investments Included','18 Month Raising Period','36 Month Investing Period','Annual Financial Statements','Multiple Closes Supported'],
          bgClass: 'bg-white',
          
        },
      ];
      

  return (
    <section className='w-full h-auto mx-auto p-4 md:p-10 lg:px-12 lg:py-0 '>
          <h2 className='text-center font-nunitosans font-bold text-[20px] md:text-[30px] lg:text-[38.57]'>Product <span className='text-primary'>Offering</span></h2>
          <div className='w-full mx-auto mt-10 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 lg:px-[60px] xl:px-0'>
            {
                 pricingPlans.map((plans, index) => (
                    <PriceCard
                    key={index}
                    id={plans.id}
                    title={plans.title}
                    price={plans.price}
                    btn={plans.btn}
                    features={plans.features}
                    bgClass={plans.bgClass}
                    bgImage={plans.bgImage}
                    />
                ))
            }

          </div>
    </section>
  )
}

export default ProductPricing

