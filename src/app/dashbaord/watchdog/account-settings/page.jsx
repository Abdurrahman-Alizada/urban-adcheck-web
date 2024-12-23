'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGetCurrentLoginUserQuery } from '@/redux/reducers/user/userThunk';

function AccountSettings() {

  const [phone, setPhone] = useState("");
  const {data:loginUser,isLoading}=useGetCurrentLoginUserQuery();

  console.log(loginUser);
  

  return (
    <div className='w-full p-2 mt-4'>
        {/* header account settings */}
         <div>
          <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
            Account Information
          </h2>
          <div className='mt-3'>
            <div className='flex flex-col md:flex-row  md:items-center justify-between'>
              <div className='flex items-center gap-3'>
              <Image
                src={'/profile-Image.png'}
                width={80}
                height={80}
                alt='profile image'
                className="object-contain"
              />
              <button className='bg-[#E9E0FF] h-10 text-[15.03px] text-primary font-semibold rounded-sm py-2 px-4'>Choose Image</button>
              </div>
              <span className="mt-2 font-nunitosans text-black font-bold text-[15.03px]">Email: <a href="#" className='font-light text-grayColor'>jenny.wilson@gmail.com</a></span>
            </div>
          </div>
         </div>
         {/* profile editing form */}
          <form action="" className='mt-4'>
              {/* full name & phone number */}
            <div className='flex flex-col md:flex-row gap-4 mb-4'>
              {/* full name */}
              <div className="w-[100%] md:w-[50%] flex flex-col gap-2">
                <label htmlFor="FullName" className="text-[16px] text-gray-800 font-nunitosans">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  id="FullName"
                  name="FullName"
                  className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                />
              </div>
              {/* phone number */}
              <div className="w-[100%] md:w-[50%] flex flex-col gap-2">
               <label htmlFor="phone" className="text-[16px] text-gray-800 font-nunitosans">Primary Phone</label>
               <PhoneInput
                  placeholder="Phone"
                  className="custom-phone-input text-[16px] text-gray-800 font-nunitosans bg-transparent focus:border-primary  outline-primary border-[1px] px-3 py-3 rounded-[5px]"
                  defaultCountry="US"
                  value={phone}
                  onChange={setPhone}
               />
               </div>
            </div>
             {/* address and website url */}
             <div className='flex flex-col lg:flex-row gap-4'>
              {/* Address Line */}
              <div className="w-[100%] lg:w-[50%] flex flex-col gap-2">
                <label htmlFor="Address" className="text-[16px] text-gray-800 font-nunitosans">
                  Enter Location
                </label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  id="Address"
                  name="Address"
                  className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                />
              </div>
              {/* full name */}
              <div className="w-[100%] lg:w-[50%] flex flex-col gap-2">
                <label htmlFor="WebsiteURL" className="text-[16px] text-gray-800 font-nunitosans">
                  Website Links (optional)
                </label>
                <input
                  type="text"
                  placeholder="Website URL"
                  id="WebsiteURL"
                  name="WebsiteURL"
                  className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                />
              </div>
             </div>
             {/* Biography */}
             <div className="w-[100%] flex flex-col gap-2 mt-4">
                <label htmlFor="Biography" className="text-[16px] text-gray-800 font-nunitosans">
                  Biography
                </label>
                <textarea
                  placeholder="Write something about yourself"
                  id="Biography"
                  name="Biography"
                  className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary resize-none h-[120px]"
                ></textarea>
             </div>
             {/* save button */}
            <div className='mt-4'>
            <button
                type="submit"
                className="text-[15px] px-6 py-2 font-semibold bg-primary text-white rounded-[5px]">
              Save Changes
             </button>
            </div>
            
          </form>
          <hr className='h-2 w-full mt-4 '/>
          {/* Password form */}
          <div className='mt-6'>
            <h2 className=" text-gray-700 text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
              Change Password
            </h2>
            <form action="" className='mt-4'>           
              {/* new password, old password  */}
              <div className='flex flex-col md:flex-row gap-4 mb-4'>
                {/* Current Password */}
                <div className="w-[100%] md:w-[50%] lg:w-[33%] flex flex-col gap-2">
                  <label htmlFor="currentPassword" className="text-[16px] text-gray-800 font-nunitosans">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    id="currentPassword"
                    name="currentPassword"
                    className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                  />
                </div>
                {/* New Password */}
                <div className="w-[100%] md:w-[50%] lg:w-[33%] flex flex-col gap-2">
                  <label htmlFor="NewPassword" className="text-[16px] text-gray-800 font-nunitosans">
                  New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    id="NewPassword"
                    name="NewPassword"
                    className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                  />
                </div>
                {/* Confirm Password */}
                <div className="w-[100%] md:w-[50%] lg:w-[33%] flex flex-col gap-2">
                  <label htmlFor="ConfirmPassword" className="text-[16px] text-gray-800 font-nunitosans">
                  Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    id="ConfirmPassword"
                    name="ConfirmPassword"
                    className="text-[16px] text-gray-800 font-nunitosans border-[1px] px-3 py-3 rounded-[5px] outline-primary focus:border-primary"
                  />
                </div>
              
              </div>
              {/* save button */}
              <div className='mt-4'>
              <button
                  type="submit"
                  className="text-[15px] px-6 py-2 font-semibold bg-primary text-white rounded-[5px]">
                Save Changes
              </button>
              </div>

            </form>
          </div>
          <hr className='h-2 w-full mt-4 '/>

          {/* verify Account */}
           <div className='mt-6'>
              <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
                Verify Your Account
              </h2>
              <p className='mt-2 text-[15.03px] font-nunitosans leading-[22px] from-neutral-400 text-[#767E94] max-w-[560px]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan felis nunc, 
                ut sagittis augue imperdiet quis. Vestibulum bibendum ultricies ipsum.
              </p>
              <div className='mt-4'>
                <span className="font-nunitosans text-black font-semibold text-[18px]">Rules & Regulations </span>
                <ul className='list-disc'>
                  <li className='text-[15.03px] font-nunitosans leading-[22px] from-neutral-400 text-[#767E94] ml:2 md:ml-5'>Lorem ipsum dolor sit amet</li>
                  <li className='text-[15.03px] font-nunitosans leading-[22px] from-neutral-400 text-[#767E94] ml:2 md:ml-5'>Lorem ipsum dolor sit amet</li>
                  <li className='text-[15.03px] font-nunitosans leading-[22px] from-neutral-400 text-[#767E94] ml:2 md:ml-5'>Lorem ipsum dolor sit amet</li>
                </ul>
              </div>
               {/* Verify button */}
               <div className='mt-4'>
                <button
                  type="submit"
                  className="text-[15px] px-6 py-2 font-semibold  bg-primary text-white rounded-[5px]">
                   Verify Now
                </button>
              </div>
           </div>
           <hr className='h-2 w-full mt-4 '/>

           {/* delete Account */}
           <div className='mt-6'>
              <h2 className="text-gray-700 text-[20px] lg:text-[24px] font-extrabold font-Archivoo">
                Delete Account
              </h2>
              <p className='mt-2 text-[15.03px] font-nunitosans leading-[22px] from-neutral-400 text-[#767E94] max-w-[560px]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan felis nunc, 
                ut sagittis augue imperdiet quis. Vestibulum bibendum ultricies ipsum.
              </p>
              <button
                  type="submit"
                  className="flex gap-1 text-[15px] px-6 py-2 font-semibold bg-[#FFE5E5] text-red-500 rounded-[5px] mt-4">
                   <RiDeleteBin6Line size={20}/>
                   Delete Account 
                </button>
           </div>
    </div>
  )
}

export default AccountSettings
