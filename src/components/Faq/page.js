"use client"
import React, { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const accordionItems = [
    {
      title: "How does Urban AdCheck work?",
      content: "Urban AdCheck connects businesses with a network of watchdogs who inspect and report on advertising displays. Clients create jobs for specific locations, and watchdogs complete these tasks by submitting photos and evaluations through our app.",
    },
    {
      title: "Who can become a watchdog?",
      content: "Anyone with a smartphone can apply to be a watchdog! Users must meet our quality standards by submitting clear, accurate reports to maintain a good Watchdog Score. Higher scores unlock more job opportunities.",
    },
    {
      title: "How do businesses benefit from Urban AdCheck?",
      content: "Our platform allows display owners to remotely monitor their advertisements without the high costs of in-person inspections. Clients receive real-time insights on ad visibility, cleanliness, and potential maintenance needs.",
    },
    {
      title: "Do you offer drone surveillance for billboard inspections?",
      content: "Yes! Our premium subscription tiers include drone photography for high-altitude or difficult-to-reach displays. Drone-certified watchdogs can capture aerial images for a more comprehensive assessment.",
    },
    {
      title: "How do watchdogs get paid?",
      content: "Watchdogs earn money for each completed and approved job. Payments are processed through the app and vary based on job type, location, and the user's Watchdog Score.",
    },
    {
      title: "Is Urban AdCheck available outside of Toronto?",
      content: "We are starting in urban centers across Ontario, with plans to expand across Canada and eventually into the U.S. Stay tuned for updates on new service areas!",
    },
    {
      title: "How do I sign up as a client or watchdog?",
      content: "Clients can create an account on our website, set up their subscription, and start posting jobs right away. Watchdogs can download the Urban AdCheck app, sign up, and start accepting jobs once their account is approved.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
       <section className='w-full h-auto mt-3 mx-auto mb-10'>
        {/* section title */}
          <h2 className='text-center font-Archivoo font-black text-[20px] md:text-[30px] lg:text-[39.57]'>Frequently Asked Questions</h2>
          <p className='text-[#585858] px-3 text-center font-nunitosans font-normal text-[16px]'>Everything you need to know about how Urban AdCheck works.</p>
          
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