import React from 'react';
import Image from 'next/image';
import { FaMapMarkedAlt, FaChartLine, FaCogs, FaCheckCircle } from 'react-icons/fa';

function About() {
  const statsData = [
    { value: "20+", label: "Years Experience" },
    { value: "100+", label: "Happy Clients" },
    { value: "15+", label: "Choice of Services" },
    { value: "10+", label: "Professional Guides" }
  ];

  const featureData = [
    { title: "Seamless Ad Monitoring", icon: <FaMapMarkedAlt size={45} className='text-primary' /> },
    { title: "Accurate & Real-Time Insights", icon: <FaChartLine size={45} className='text-primary' /> },
    { title: "Flexible Service Packages", icon: <FaCogs size={45} className='text-primary' /> },
    { title: "Complete Solutions for Your Advertising Needs", icon: <FaCheckCircle size={45} className='text-primary' /> }
  ];

  return (
    <div>
      {/* Hero section */}
      <section className='w-full min-h-svh mx-auto flex items-end justify-center' style={{
        backgroundImage: "url('/bg-about-hero.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}>
       
      </section>

      <h2 className="text-[30px] mt-10 text-center md:text-[35px] lg:text-[60px] font-bold font-NotoSans text-black leading-[50px] md:leading-[70px]">
          Your Trusted Partner in Ad Verification
        </h2>
      
      {/* About content */}
      <section className='w-full flex flex-col items-center md:flex-row md:px-[50px] lg:px-[100px] mt-10'>
        {/* Right side */}
        <div className='md:w-1/2 p-4 md:p-2'>
          <Image src={'/about-picture.png'} width={450} height={600} alt='about-image' className='object-contain'/>
        </div>

        {/* Left side */}
        <div className='md:w-1/2 p-4 md:p-2'>
          <p className='max-w-[463px] text-[#585858] font-nunitosans font-semibold text-[16px]'>
            WELCOME TO URBAN ADCHECK!
          </p>
          <h2 className='font-nunitosans font-semibold text-[20px] md:text-[24px] lg:text-[28.57px]'>
            Your trusted partner in billboard and advertising display verification.
          </h2>
          <hr className="w-12 border-primary border-t-[4px]" />
          <p className='max-w-[463px] text-[#585858] mt-4 font-nunitosans font-normal text-[16px]'>
            We specialize in helping businesses ensure their billboard ads are exactly how they envisioned. Our mission is simple: to provide reliable, efficient, and thorough ad verification services, making sure your advertising investments are accurately represented in the real world.
          </p>
          <div className='flex flex-wrap md:flex-row gap-3 mt-5 md:gap-6'>
            {statsData.map((data, index) => (
              <div key={index} className='flex flex-col'>
                <span className='text-secondary font-semibold'>{data.value}</span>
                <p className='text-gray-400 text-[15px] md:text-[16px]'>{data.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About 3rd section */}
      <section className='w-full mx-auto min-h-[200px] p-4 bg-primary flex justify-center mt-10 mb-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
          {featureData.map((feature, index) => (
            <div key={index} className='bg-white opacity-90 rounded-md flex flex-col gap-2 items-center justify-center px-4 py-4'>
              {feature.icon}
              <p className='max-w-[463px] text-black text-center font-nunitosans font-semibold text-[16px]'>
                {feature.title}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
