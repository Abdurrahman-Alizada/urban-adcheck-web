"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faCircleXmark,  } from '@fortawesome/free-solid-svg-icons';


function Header() {
  const [MenuOpen,setMenuOpen]=useState(false);
  

  const navItems = [
    { href: '/', label: 'About us' },
    { href: '/about', label: 'Services' },
    { href: '/services', label: 'F&Q' },
    { href: '/contact', label: 'Contact' },
  ];


  const openSidebarMenu=()=>{
      setMenuOpen(true);
  }
  const closeSidebarMenu=()=>{
    setMenuOpen(false);
}

  return (
    <header className="w-full h-[60px] relative lg:h-[100px] px-4 lg:px-16 shadow-custom-shadow flex justify-between items-center bg-white">
      {/* Logo Section */}
      <div className="">
        <Image 
          src="/logo.png" 
          width={285} 
          height={80} 
          alt="Company Logo"
          className="object-contain w-[140px] h-[80px] lg:w-[205px] lg:h-[80]" 
        />
      </div>

      {/* Navigation Menu */}
      <nav className='hidden xl:inline-block'>
        <ul className="flex space-x-6 text-[#818080] font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} legacyBehavior>
                <a className="hover:text-primary font-NotoSans text-[18px] leading-6">
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* profile Image & Button */}
      <div className='flex gap-4'>
        <Image  src="/profile-image.png" 
          width={40} 
          height={40} 
          alt="Profile Image"
          className="object-contain hidden xl:inline-block"/>

        <button className="hidden xl:inline-block  px-4 py-2 rounded-[10px] bg-secondary text-white  hover:bg-primary">
          Dashbaord
        </button>
      </div>

      <div className='xl:hidden flex items-center gap-4'>
      <Image  src="/profile-image.png" 
          width={40} 
          height={40} 
          alt="Profile Image"
          className="object-contain"/>
          <button className="hidden md:inline-block text-[14px] px-4 py-2 rounded-[10px] bg-secondary text-white  hover:bg-blue-600">
          Dashbaord
        </button>
      <FontAwesomeIcon icon={faBars} size={'xl'} className='cursor-pointer' onClick={openSidebarMenu} />
      
      </div>

      {/* sidebar Menu for mobile and tablet */}
      { MenuOpen && <div className='w-3/5 z-10 md:w-2/5 max-h-svh lg:hidden fixed inset-0 bg-opacity-80 bg-black '>
         {/* Navigation Menu */}
         <div className='relative'>
         <FontAwesomeIcon icon={faCircleXmark} size={'xl'} color='white' className=' cursor-pointer absolute right-2 top-2' onClick={closeSidebarMenu} />
         </div>
         <nav className='z-10'>
          <ul className="flex z-10 flex-col gap-3 p-6 text-white font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} legacyBehavior>
                  <a className="hover:text-secondary font-NotoSans text-[18px] leading-6">
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
            <button className="md:hidden text-[18px] px-4 py-2 rounded-[10px] bg-secondary text-white  hover:bg-blue-600">
              Dashbaord
            </button>
          </ul>
        </nav>
      </div>
      }
    </header>
  );
}

export default Header;
