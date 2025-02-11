import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
function Hero() {

  return (
    <section
    className="w-full lg:min-h-screen relative flex flex-col md:flex-row justify-between px-3 md:px-5 lg:px-[80px] py-4 md:py-6 lg:pt-[150px] lg:pb-0"
    style={{
      backgroundImage: "url('/hero-overlay.png')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  >
    {/* Overlay Image */}
    <div className="absolute inset-0">
      <Image
        src="/hero-bg.png" // Replace with your overlay image path
        alt="Overlay Image"
        layout="fill"
        objectFit="cover" // Ensures the overlay covers the entire section
        className="opacity-70 pointer-events-none" // Adjust opacity as needed
      />
    </div>
  
    {/* Left Section */}
    <div className="relative w-full md:w-1/2  md:mb-10 lg:mb-16">
      {/* Welcome Banner */}
      <div className="bg-white inline-block px-4 md:px-2 lg:px-4 py-2 md:py-1 lg:py-0 rounded-[10px] mb-2 md:mb-6">
        <span className="font-nunitosans text-[15px] font-light">👋 Welcome to URBAN-AdCHECK </span>
      </div>
  
      {/* Heading and Floating Image */}
      <div className="relative mb-2">
        <h2 className="text-[30px] md:text-[35px] lg:text-[60px] font-bold font-NotoSans text-white leading-[70px]">
          URBAN-AdCHECK
        </h2>
      </div>
      {/* Description and Button */}
      <div>
        <p className="max-w-[480px] text-white font-NotoSans text-[16px] md:text-[18px] lg:text-[20px] mb-6 leading-6 md:leading-8">
          Hidupkan suasana ruanganmu dengan berbagai produk dan koleksi pilihan furniture tebaik!
          Temukan furniture idamanmu sekarang
        </p>
        <button 
        className="flex items-center text-[18px] px-12 py-4  rounded-[10px] bg-secondary text-white">
          <Link href="/account/signup">Get Started</Link>
        </button>
      </div>
    </div>
  
    {/* Right Section */}
    <div className="relative w-full md:w-1/2 flex flex-col z-10">
      {/* Top Left Image */}
      <Image
        src="/hero-img-3.png"
        width={243}
        height={163}
        alt="Top Left Decorative"
        className="self-start lg:self-center md:absolute md:top-16 lg:relative  lg:top-0 lg:mr-[210px] lg:mt-[40px]  md:w-[183px] md:h-[113px] lg:w-[243px] lg:h-[163px]"
      />
  
      {/* Center Image */}
      <Image
        src="/hero-img-1.png"
        width={680}
        height={680}
        alt="Center Decorative"
        className="absolute bottom-0 self-end lg:self-center -mt-[30px]  mobileL:mr-[0px] sm:-mt-[0px] lg:-mr-[50px] -mr-[10px] md:-mr-[0px] md:ml-[50px] lg:ml-[50px] w-[220px] h-[220px] mobileM:w-[250px] mobileM:h-[250px] md:w-[340px] md:h-[340px] lg:w-[500px] lg:h-[500px] object-contain"
      />
  
      {/* Bottom Left Image */}
      <Image
        src="/hero-img-4.png"
        width={243}
        height={177}
        alt="Bottom Left Decorative"
        className="self-start md:absolute md:bottom-0 lg:relative lg:top-0  md:-mr-[50px]  -mb-12 lg:-ml-7 lg:mt-[100px] "
      />
    </div>
  </section>
  
  );
}

export default Hero;
