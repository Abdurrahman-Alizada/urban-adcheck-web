'use client'
import React, { useState } from 'react';

function Signup() {
  const [selectedRole, setSelectedRole] = useState('Client'); // State to manage selected role

  return (
    <div className="flex justify-center mt-[150px] mb-[150px] relative">
      <div className="w-[100%] mobileL:w-[85%] md:w-[75%] lg:w-[45%] flex justify-center relative">
        {/* First background image */}
        <div
          className="absolute top-[-100px] lg:top-[-100px] lg:left-[-100px] z-[-1] w-[220px] h-[220px]"
          style={{
            backgroundImage: "url('/shape.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>

      {/* Sign up section */}
      <section className="relative z-[1] w-[100%] shadow-custom-shadow px-6 pt-10 pb-10 bg-white">
        {/* title */}
        <div className="flex flex-col gap-1">
          {/* Signup title part */}
          <h2 className="text-[20px] md:text-[24px] lg:text-[32px] font-extrabold font-Archivoo">
            Create your account with us below
          </h2>
          <span className="font-nunitosans font-[14px]">
            Already have an account?
            <a href="#" className="text-primary underline font-semibold">
              Login
            </a>
          </span>
        </div>

        {/* Tabs */}
        <div className="mt-4 mb-2">
          <span className="font-nunitosans">You’re creating an account as?</span>
          <div className="mt-2 flex flex-col mobileL:flex-row  gap-5">
            {/* Client Radio Button */}
            <label
              htmlFor="client"
              className={`flex items-center gap-1 lg:gap-3 border-[1px] rounded-[10px] px-4 w-[160px] lg:w-[280px] h-[60px] cursor-pointer ${
                selectedRole === 'Client'
                  ? 'border-primary bg-[#068179] bg-opacity-[13%] text-primary'
                  : 'border-grayColor bg-transparent'
              }`}
            >
              <input
                type="radio"
                id="client"
                name="role"
                value="Client"
                checked={selectedRole === 'Client'}
                onChange={() => setSelectedRole('Client')}
                className="accent-primary cursor-pointer"
              />
              Client
            </label>

            {/* Watchdog Radio Button */}
            <label
              htmlFor="watchdog"
              className={`flex items-center gap-3 border-[1px] rounded-[10px] px-4 w-[160px] lg:w-[280px] h-[60px] cursor-pointer ${
                selectedRole === 'Watchdog'
                  ? 'border-primary bg-[#068179] bg-opacity-[13%] text-primary'
                  : 'border-grayColor bg-transparent'
              }`}
            >
              <input
                type="radio"
                id="watchdog"
                name="role"
                value="Watchdog"
                checked={selectedRole === 'Watchdog'}
                onChange={() => setSelectedRole('Watchdog')}
                className="accent-primary cursor-pointer"
              />
              Watchdog
            </label>
          </div>
        </div>

        {/* Form */}
        <form className="mt-6 mb-10 flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-[16px]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Devid Meller"
              id="fullName"
              name="Full Name"
              className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[16px]">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter Your Email Address"
              name="email"
              className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[16px]">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create Your Password"
              name="password"
              className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label htmlFor="Phone" className="text-[16px]">
              Phone Number
            </label>
            <input
              type="text"
              id="Phone"
              placeholder="Enter Your Phone Number"
              name="Phone"
              className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label htmlFor="Address" className="text-[16px]">
              Current Address
            </label>
            <input
              type="text"
              id="Address"
              placeholder="Enter Your Current Address"
              name="Address"
              className="text-[15.04px] border-[1px] px-3 py-3 rounded-[5px] focus:border-primary"
            />
          </div>

          <div className="flex justify-center">
            <button className="bg-primary text-white w-[249px] h-[59px] rounded-[10px] text-[18px]">
              Create Account as {selectedRole}
            </button>
          </div>
        </form>
      </section>

      {/* Last background image */}
      <div
          className="absolute bottom-[-140px] lg:bottom-[-100px] lg:left-[100%] lg:translate-x-[-50%] z-[-1] w-[220px] h-[220px]"
          style={{
            backgroundImage: "url('/shape-2.png')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Signup;
