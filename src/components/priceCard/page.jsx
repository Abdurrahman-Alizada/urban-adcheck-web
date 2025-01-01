'use client';
import React from 'react';
import Image from 'next/image';

function PriceCard({ Package }) {
  const features = [
    { label: 'Validity', value: Package?.validity },
    { label: ' ', value: Package?.shortDesc },
    { label: 'Total Jobs', value: Package?.totalJobs },
    { label: 'Featured Jobs', value: Package?.featuredJobs },
    { label: 'Priority Support', value: Package?.features?.prioritySupport },
    { label: 'Job Duration', value: Package?.features?.jobDuration },
    { label: ' ', value: Package?.services?.[0]?.details || Package?.services?.[1]?.details},
    { label: 'Discount', value: `${Package?.discount?.percentage || 0}%` },
  ];

  return (
    <div className="shadow-md py-4 px-16 rounded-[10px] bg-white">
      <h2 className="font-semibold text-[28.59px] font-Archivoo leading-relaxed">
        {Package?.packageName}
      </h2>
      <span className="text-[16.2px] font-Archivoo">{Package?.subtitle}</span>

      <div className="mt-6">
        <h3 className="text-[46px] font-Archivoo font-semibold leading-10">
          {Package?.pricing} <sub className="text-[12px]">/ {Package?.frequency}</sub>
        </h3>
      </div>

      <div className="w-full mt-6">
        <button className="text-[15.2px] font-Archivoo px-8 py-2 rounded-[10px] bg-primary text-white">
          {Package?.buttonText || 'Get Started'}
        </button>
      </div>

      <ul className="text-left mt-6">
        {features
          .filter((feature) => feature.value) // Filter out undefined/null features
          .map((feature, index) => (
            <li key={index} className="flex items-center font-Archivo mb-2 font-normal text-[17.15px] text-[#162B60]">
              <Image
                src="/check.png"
                width={17.59}
                height={17.59}
                alt="Check icon"
                className="object-contain mr-2"
              />
              <span>{`${feature.label}: ${feature.value}`}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default PriceCard;
