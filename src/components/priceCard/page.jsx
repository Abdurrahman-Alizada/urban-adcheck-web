'use client';
import React from 'react';
import Image from 'next/image';
import { useGetCurrentLoginUserQuery } from '@/redux/reducers/user/userThunk';
import { useSubscribePackageMutation } from '@/redux/reducers/jobs/jobThunk';
import { useRouter } from 'next/navigation';

function PriceCard({ Package }) {
   const router=useRouter();
  console.log(Package._id)
  const features = [
    { label: 'Validity', value: Package?.validity },
    { label: ' ', value: Package?.shortDesc },
    { label: 'Total Jobs', value: Package?.totalJobs },
    { label: 'Featured Jobs', value: Package?.featuredJobs },
    { label: 'Priority Support', value: Package?.features?.prioritySupport },
    { label: 'Job Duration', value: Package?.features?.jobDuration },
    { label: ' ', value: Package?.services?.[0]?.details || Package?.services?.[1]?.details },
    { label: 'Discount', value: `${Package?.discount?.percentage || 0}%` },
  ];

  const { data: user } = useGetCurrentLoginUserQuery();
  const [subscribePackage, { isError, error, isLoading }] = useSubscribePackageMutation();
  const handlePackageSubscribtion = () => {
    if (user) {
      subscribePackage({ userId: user?._id, packageId: Package?._id }, { skip: !user?._id }).then((res) => 
        { 
          if(res?.data?.url){
            window.open(res.data.url, '_blank');
          }
          else{
            alert("somthing went wrone");
          }
        
        })
    }
    else {
       router.push("/account/login")
    }
  }

  return (
    <div className="shadow-md py-4 px-12 rounded-[10px] bg-white hover:bg-[#162B60] group transition-all duration-300">
      {/* Parent container applies hover state */}
      <h2 className="font-semibold text-[28.59px] font-Archivoo leading-relaxed text-primary group-hover:text-[#3ED37A]">
        {Package?.packageName}
      </h2>
      <span className="text-[16.2px] font-Archivoo group-hover:text-white">
        {Package?.subtitle}
      </span>

      <div className="mt-6">
        <h3 className="text-[46px] font-Archivoo text-primary font-semibold leading-10 group-hover:text-white">
          {Package?.pricing} <sub className="text-[12px] text-black group-hover:text-white">/ {Package?.frequency}</sub>
        </h3>
      </div>

      <div className="w-full mt-6">
        <button onClick={handlePackageSubscribtion} className="text-[15.2px] font-Archivoo px-8 py-2 rounded-[10px] bg-primary text-white group-hover:bg-[#3ED37A] group-hover:text-[#162B60] transition-all duration-300">
          {Package?.buttonText || 'Get Started'}
        </button>
      </div>

      <ul className="text-left mt-6">
        {features
          .filter((feature) => feature.value) // Filter out undefined/null features
          .map((feature, index) => (
            <li
              key={index}
              className="flex items-center font-Archivo mb-2 font-normal text-[17.15px] text-[#162B60] group-hover:text-white"
            >
              <Image
                src="/check.png"
                width={17.59}
                height={17.59}
                alt="Check icon"
                className="object-contain mr-2 group-hover:text-white"
              />
              <span>{`${feature.label}: ${feature.value}`}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default PriceCard;
