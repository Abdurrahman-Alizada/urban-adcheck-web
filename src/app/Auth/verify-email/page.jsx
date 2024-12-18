import React from 'react'
import Image from 'next/image';
import { IoIosArrowBack } from "react-icons/io";

function ResetPassword() {
  return (
    <div className="flex justify-center mt-[150px] mb-[150px] relative">
    <div className="w-[95%] mobileL:w-[85%] md:w-[75%] lg:w-[40%] flex justify-center relative">
      {/* First background image */}
      <div
        className="absolute top-[-100px] md:left-[-90px] lg:left-[-100px] z-[-1] w-[220px] h-[220px]"
        style={{
          backgroundImage: "url('/shape.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      ></div>

      {/* Login Section */}
      <section className="relative z-[1] w-[100%] shadow-custom-shadow px-6 pt-10 pb-10 bg-white">
        <div className="flex gap-1 items-center justify-center">
          <Image
            src={'/favicon.png'}
            width={30}
            height={30}
            alt="Favicon"
            className="object-contain"
          />
          <h2 className="text-grayColor font-bold">Urban Adcheck</h2>
        </div>
        <div className="mt-8 flex flex-col">
          <h2 className="font-nunitosans">Two-Step Verification 💬</h2>
          <span className="font-nunitosans  text-[14px] text-grayColor">
          We sent a verification code to your mobile. Enter the code from the mobile in the field below.
          </span>
          <span className='text-[16px]'>******9763</span>
           </div>
        <div className="mt-6">
          <form className="flex flex-col gap-3">
            {/* New Password */}
          
            <span className="font-nunitosans  text-[16px] text-grayColor">
              Type your 6 digit security code </span>
              {/* code boxes */}
            {/* Login Button */}
            <div className="flex justify-center">
              <button className="bg-primary text-white w-full h-[52px] rounded-[10px] text-[18px]">
                Verify My Account
              </button>
            </div>
           <div className='flex justify-center'>
           <span className="font-nunitosans font-[14px]">
             Didn&apost get the code?  
            <a href="#" className="text-primary underline font-semibold">
             Resend
            </a>
          </span>
           </div>
           
          </form>
        </div>
      </section>

      {/* Last background image */}
      <div
        className="absolute bottom-[-140px] md:left-[90%] lg:left-[90%] md:translate-x-[-50%] z-[-1] w-[220px] h-[220px]"
        style={{
          backgroundImage: "url('/shape-2.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      ></div>
    </div>
  </div>
  )
}

export default ResetPassword
