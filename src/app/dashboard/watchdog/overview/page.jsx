'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLayerGroup, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { BsCheck2Circle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { CgCloseO } from "react-icons/cg";


function Overview() {
  const [activeJobIndex, setActiveJobIndex] = useState(null);

  const openJobActionModal = (index) => {
    setActiveJobIndex(index); // Open the modal for the specific ad
  };

  const closeJobActionModal = () => {
    setActiveJobIndex(null); // Close the modal
  };

  const cardsData = [
    {
      title: 'Posted jobs',
      jobs: '43',
      image: '/posted-jobs.png',
      alt: 'posted-jobs',
      bgColor: '#E8F7FF',
      

    },
    {
      title: 'In progress',
      jobs: '43',
      image: '/in-progress.png',
      alt: 'posted-jobs',
      bgColor: '#B8FFFA',
    },
    {
      title: 'Pending jobs',
      jobs: '443',
      image: '/pending-jobs.png',
      alt: 'pending-jobs',
      bgColor: '#FFE5E5',
    },
    {
      title: 'Completed jobs',
      jobs: '23',
      image: '/Completed-jobs.png',
      alt: 'completed-jobs',
      bgColor: '#E4F9E0',
    },
  ];


  const jobsData = [
    {
      image: '/ads-img.png',
      category: 'Home & Kitchen',
      title: 'Urnab ad checker',
      price: '$160.00',
    },
    {
      image: '/ads-img.png',
      category: 'Electronics',
      title: 'Wireless Headphones',
      price: '$99.00',
    },
    {
      image: '/ads-img.png',
      category: 'Fashion',
      title: 'Leather Handbag',
      price: '$120.00',
    },
  ];

  return (
    <div className="space-y-10 mt-5 p-3 lg:p-0">
       {/* Cards Section */}
       <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cardsData.map((card, index) => (
          <div
            key={index}
            style={{ backgroundColor: card.bgColor }}
            className="flex justify-between items-center rounded-lg px-3 py-6"
          >
            <div className="flex flex-col">
              <span className="text-xl font-semibold">{card.jobs}</span>
              <span className="text-gray-500 text-[16px]">{card.title}</span>
            </div>
            <Image
              src={card.image}
              width={68}
              height={68}
              alt={card.alt}
              className="object-contain"
            />
          </div>
        ))}
      </section>

      {/* Recently Posted Jobs Section */}
      <section>
        {/* Section Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg md:text-xl">Recently Posted Jobs</h2>
          <button className="border-b border-transparent hover:border-black transition duration-150 text-base md:text-lg font-medium">
            View All <FontAwesomeIcon icon={faArrowRight} className="text-gray-400" size="xs" />
          </button>
        </div>

        {/* Jobs Grid */}
        <div className="mt-6 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {jobsData.map((ad, index) => (
            <div key={index} className="shadow-custom-shadow rounded-lg overflow-hidden relative z-0">
              {/* Ad Image */}
              <Image
                src={ad.image}
                width={300}
                height={240}
                alt={ad.title}
                className="w-full h-auto object-cover"
              />

              {/* Ad Content */}
              <div className="px-5 py-3 border-b">
                <span className="text-gray-500 text-sm flex items-center gap-2">
                  <FontAwesomeIcon icon={faLayerGroup} size="sm" />
                  {ad.category}
                </span>
                <h2 className="mt-2 text-[22px] font-semibold">{ad.title}</h2>
              </div>

              {/* Ad Footer */}
              <div className="px-5 py-4 flex justify-between items-center">
                <span className="text-[#FF4F4F] font-bold">{ad.price}</span>
                <FontAwesomeIcon
                  icon={faEllipsis}
                  className="text-gray-500 cursor-pointer"
                  size="sm"
                  onClick={() => openJobActionModal(index)}
                />
              </div>

              {/* Job Action Modal */}
              {activeJobIndex === index && (
                <div className="w-[160px] p-4 shadow-custom-shadow absolute right-0 bottom-0 bg-white rounded-sm z-9999">
                  <span className="flex items-center gap-2 text-gray-400 text-[16px]">
                    <BsCheck2Circle size={20} /> Accept Job
                  </span>
                  <span className="flex items-center gap-2 text-gray-400 text-[16px]">
                    <RxCross2 size={20} /> Reject Job
                  </span>
                  {/* Close Modal */}
                  <CgCloseO
                    size={20}
                    className="absolute top-0 right-0 cursor-pointer"
                    onClick={closeJobActionModal}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Overview;
