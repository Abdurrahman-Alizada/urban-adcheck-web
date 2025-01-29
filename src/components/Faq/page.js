"use client"
import React, { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const accordionItems = [
    {
      title: "Is there a free trial available?",
      content: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      title: "How does billing work?",
      content: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      title: "Can I change my plan later?",
      content: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      title: "What is your cancellation policy?",
      content: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      title: "Can other info be added to an invoice?",
      content: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
  ]
  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
       <section className='w-full h-auto mt-3 mx-auto mb-10'>
        {/* section title */}
          <h2 className='text-center font-Archivoo font-black text-[20px] md:text-[30px] lg:text-[39.57]'>Frequently asked questions</h2>
          <p className='text-[#585858] px-3 text-center font-nunitosans font-normal text-[16px]'>Everything you need to know about the product and billing.</p>
          
          <div className='md:w-1/2 mx-auto mt-10'>
            <div className="accordion-container  ">
              {accordionItems.map((item, index) => (
                <div
                  key={index}
                  className="accordion-item border-b-2 border-gray-50 pb-5 overflow-hidden"
                >
                  <button
                    className={`accordion-header flex justify-between items-center w-full p-4 text-left font-medium text-gray-800 ${
                      activeIndex === index ? "bg-white text-black" : "bg-white"
                    }`}
                    onClick={() => toggleAccordion(index)}
                  >
                    {item.title}
                    <span>
                      {activeIndex === index ? <FaMinus/> : <FaPlus/>}
                    </span>
                  </button>
                  <div
                    className={`accordion-content px-4 py-2 ${
                      activeIndex === index ? "block" : "hidden"
                    }`}
                  >
                 
                    <p className='text-[#585858]  font-nunitosans font-normal text-[16px]'>{item.content}</p>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default FAQ
