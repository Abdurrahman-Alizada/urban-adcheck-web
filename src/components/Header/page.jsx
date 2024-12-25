"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleXmark, faL } from '@fortawesome/free-solid-svg-icons';
import { useSignOutUserMutation } from '@/redux/reducers/user/userThunk';
import { GoPlusCircle, GoGear } from "react-icons/go";
import {  PiSignOut } from "react-icons/pi";
import { useRouter } from 'next/navigation';



function Header() {
  const [MenuOpen, setMenuOpen] = useState(false);
  const [user,setUser]=useState({});
  const [showDropdown,setShowDropdown]=useState(false);
 
  const [signOutUser, {}]=useSignOutUserMutation();
  const router=useRouter();

  useEffect(()=>{
    const userData=JSON.parse(localStorage.getItem('userInfo'));
   try{
      if(userData)
        {
          setUser(userData);
        }
    }
    catch(error){
      console.error("Failed to parse user data:",error)
    }
  },[])

  const navItems = [
    { href: '/about', label: 'About us' },
    { href: '/Pricing', label: 'Services' },
    { href: '/faq', label: 'F&Q' },
    { href: '/contact', label: 'Contact' },
  ];

  const openSidebarMenu = () => {
    setMenuOpen(true);
  }

  const closeSidebarMenu = () => {
    setMenuOpen(false);
  }

  const toggleDropdown=()=>{
        setShowDropdown((prev)=>!prev)
  }
  
  const SignoutUser=()=>{
    signOutUser().then((res)=>{
      console.log("respons us", res)
      localStorage.removeItem("userInfo")
      // navigate to login/
      router.push("/auth/login")
      
    })
  }

  return (
    <>
         <header className="w-full h-[60px] relative lg:h-[100px] px-4 lg:px-16 shadow-custom-shadow flex justify-between items-center bg-white">
            {/* Logo Section */}
            <div>
              <Link href="/">
                <Image 
                  src="/logo.png" 
                  width={205} 
                  height={80} 
                  alt="Company Logo"
                  className="object-contain w-[140px] h-[80px] lg:w-[205px] lg:h-[80]" 
                />
              </Link>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden xl:inline-block">
              <ul className="flex space-x-6 text-[#818080] font-medium">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-primary font-NotoSans text-[18px] leading-6">
                        {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Profile Image & Button */}
              {
                user?.accessToken ? 
                <div className="flex gap-4">
                  
                  <div
                  className='relative inline-block'
                  onClick={toggleDropdown}
                  >
                        <Image 
                          src="/profile-image.png" 
                          width={40} 
                          height={40} 
                          alt="Profile Image"
                          className="cursor-pointer object-contain hidden xl:inline-block"
                        />
                        {showDropdown && (
                          <div className="absolute -right-12 mt-2 w-32 z-10 bg-white border rounded shadow-lg">
                            <ul className='flex flex-col gap-3 px-1 py-2'>
                                  <li className="flex items-center gap-4 text-gray-400">
                                      <Link href={"/dashbaord/watchdog/account-settings"}  className="flex items-center gap-2 hover:text-primary">
                                        <GoGear size={22}/>
                                        <span className="text-[15.03px]">Account Settings</span>
                                      </Link> 
                                  </li>
                                  <li className="flex items-center gap-4 text-gray-400">
                                      <div onClick={SignoutUser} className="cursor-pointer flex items-center gap-2 hover:text-primary">
                                        <PiSignOut size={22}/>
                                        <span className="text-[15.03px]">Sign Out</span>
                                      </div>
                                  </li>                                   
                            </ul>
                          </div>
                        )}
                  </div>

                </div>       
                :
                // login & sign buttons 
                <div className='flex gap-2'>
                  <Link href="/auth/login">
                    <button className="hidden xl:inline-block px-6 py-2 rounded-[10px] bg-primary text-white hover:bg-primary">
                      Login
                    </button>
                  </Link>
                  <Link href="/auth/signup">
                    <button className="hidden xl:inline-block px-6 py-2 rounded-[10px] bg-secondary text-white hover:bg-primary">
                      SignUp
                    </button>
                  </Link>
                </div>
              
              }

              {/* Mobile & Tablet Sidebar Toggle */}
              <div className="xl:hidden flex items-center gap-4">
                <Image 
                  src="/profile-image.png" 
                  width={40} 
                  height={40} 
                  alt="Profile Image"
                  className="object-contain"
                />
                <Link href="/dashbaord/client/overview">
                  <button className="hidden md:inline-block text-[14px] px-4 py-2 rounded-[10px] bg-secondary text-white hover:bg-blue-600">
                    Dashboard
                  </button>
                </Link>
                <FontAwesomeIcon icon={faBars} size={'xl'} className="cursor-pointer" onClick={openSidebarMenu} />
              </div>

              {/* Sidebar Menu for mobile and tablet */}
              {MenuOpen && (
                <div className="w-3/5 z-10 md:w-2/5 max-h-svh lg:hidden fixed inset-0 bg-opacity-80 bg-black">
                  {/* Navigation Menu */}
                  <div className="relative">
                    <FontAwesomeIcon icon={faCircleXmark} size={'xl'} color="white" className="cursor-pointer absolute right-2 top-2" onClick={closeSidebarMenu} />
                  </div>
                  <nav className="z-10">
                    <ul className="flex z-10 flex-col gap-3 p-6 text-white font-medium">
                      {navItems.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="hover:text-secondary font-NotoSans text-[18px] leading-6">              
                              {item.label}                        
                          </Link>
                        </li>
                      ))}
                      <Link href="/dashbaord/watchdog/overview">
                        <button className="md:hidden text-[18px] px-4 py-2 rounded-[10px] bg-secondary text-white hover:bg-blue-600">
                          Dashboard
                        </button>
                      </Link>
                    </ul>
                  </nav>
                </div>
              )}
         </header> 
    </>
   
  );
}

export default Header;
