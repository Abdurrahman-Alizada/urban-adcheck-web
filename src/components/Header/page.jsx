"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleXmark, faL } from '@fortawesome/free-solid-svg-icons';
import { useGetCurrentLoginUserQuery, useSignOutUserMutation } from '@/redux/reducers/user/userThunk';
import { GoPlusCircle, GoGear } from "react-icons/go";
import { PiSignOut } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import { MdOutlineChat } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import Notification from '../notification/page';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Header() {
  const [MenuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const [signOutUser, { }] = useSignOutUserMutation();
  const { data: currentLoginUser } = useGetCurrentLoginUserQuery();
  const router = useRouter();

  const userRole = currentLoginUser?.role;

  useEffect(() => {
    function handleClickOutside(event) {
      // Handle dropdown click outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      
      // Handle notification click outside
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // useEffect(()=>{
  //   const userData=JSON.parse(localStorage.getItem('userInfo'));
  //  try{
  //     if(userData)
  //       {
  //         setUser(userData);
  //       }
  //   }
  //   catch(error){
  //     console.error("Failed to parse user data:",error)
  //   }
  // },[])

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

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  const SignoutUser = () => {
    signOutUser().then((res) => {
      console.log("respons us", res)
      localStorage.removeItem("userInfo")
      // navigate to login/

      toast.success('Logout successful', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      // Navigate to login page and reload
      router.push("/account/login");
      setTimeout(() => {
        window.location.reload();
      }, 500); // Small delay to ensure navigation happens first
    })
  }

  const handleNotification = () => {
    setShowNotifications(prev => !prev);
  };


  const handlePostJobClick = () => {
    router.push("/dashboard/client/post-job");
  };

  return (
    
      <div className=''>
        <header className="w-full z-50 top-0 px-4 lg:px-6 xl:px-10 shadow-custom-shadow flex gap-5 justify-between items-center bg-white">
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
          <nav className="hidden lg:inline-block">
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

          {/* Dynamic part of the code */}
          <div className='flex items-center'>
            
            {/* Updates needed for watchdog role */}
            {
currentLoginUser?.role.isWatchDog ? (
  <div className="flex items-center gap-2">
    <div className="flex gap-4">
      <div className="relative flex items-center gap-3">
        {/* Wrap notification bell in ref */}
        <div ref={notificationRef}>
          <FaBell
            size={25}
            color="green"
            className="cursor-pointer"
            onClick={handleNotification}
          />
          {showNotifications && (
            <Notification setShowNotifications={setShowNotifications} />
          )}
        </div>
        
        {/* Wrap profile dropdown in ref */}
        <div ref={dropdownRef} className="relative inline-block">
          <Image
            src="/profile-image.png"
            width={40}
            height={40}
            alt="Profile Image"
            className="cursor-pointer object-contain"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="absolute right-1 mt-2  w-[200px] z-10 bg-white border rounded shadow-lg" ref={dropdownRef}>
              <ul className="flex flex-col gap-3 px-1 py-2" >
                <li className="flex items-center gap-4 text-gray-400" >
                  <Link
                    href={"/dashboard/watchdog/account-settings"}
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <GoGear size={22} />
                    <span className="text-[15.03px]">Account Settings</span>
                  </Link>
                </li>
                <li className="flex items-center gap-4 text-gray-400">
                  <div
                    onClick={SignoutUser}
                    className="cursor-pointer flex items-center gap-2 hover:text-primary"
                  >

                    <PiSignOut size={22} />
                    <span className="text-[15.03px]">Sign Out</span>
                  </div>
                  
                </li>
                
              </ul>
            </div>
          )}
            
        </div>
      </div>
      <div>
        {/* <button
          onClick={handlePostJobClick}
          className="hidden md:inline-block px-3 md:px-6 py-2 text-[10px] md:text-[16px] rounded-[10px] bg-secondary text-white hover:bg-primary"
        >
          Dashboard
        </button> */}
      </div>
    </div>
  </div>
) : currentLoginUser?.role.isClient ? (
  <div className="flex items-center gap-2">
    <div className='flex'>
      <div className='flex items-center gap-3'>
        {/* Wrap notification bell in ref */}
        <div ref={notificationRef}>
          <FaBell 
            size={25} 
            color='green' 
            className="cursor-pointer"
            onClick={handleNotification} 
          />
          {showNotifications && (
            <Notification setShowNotifications={setShowNotifications} />
          )}
        </div>
        
        {/* Wrap profile dropdown in ref */}
        <div
          ref={dropdownRef}
          className='relative inline-block'
        >
          <Image
            src="/profile-image.png"
            width={40}
            height={40}
            alt="Profile Image"
            className="cursor-pointer object-contain"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="absolute right-1 mt-2  w-[200px] z-10 bg-white border rounded shadow-lg">
              <ul className='flex flex-col gap-3 px-1 py-2'>
                <li className="flex items-center gap-4 text-gray-400">
                  <Link href={"/dashboard/client/account-setting"} className="flex items-center gap-2 hover:text-primary">
                    <GoGear size={22} />
                    <span className="text-[15.03px]">Account Settings</span>
                  </Link>
                </li>
                <li className="flex items-center gap-4 text-gray-400">
                  <div onClick={SignoutUser} className="cursor-pointer flex items-center gap-2 hover:text-primary">
                    <PiSignOut size={22} />
                    <span className="text-[15.03px]">Sign Out</span>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)

                  :
                  currentLoginUser?.role.isAdmin ?
                    <div className="flex items-center gap-2">
                      <div className='flex'>
                        <div className='flex items-center gap-3'>
                          <FaBell size={25} color='green' onClick={handleNotification} />
                          <div
                            className='relative inline-block'
                            onClick={toggleDropdown}
                          >
                            <Image
                              src="/profile-image.png"
                              width={40}
                              height={40}
                              alt="Profile Image"
                              className="cursor-pointer object-contain"
                            />
                            {showDropdown && (
                              <div className="absolute right-1 mt-2  w-[200px] z-10 bg-white border rounded shadow-lg">
                                <ul className='flex flex-col gap-3 px-1 py-2'>
                                  <li className="flex items-center gap-4 text-gray-400">
                                    <Link href={"/dashboard/admin/account-setting"} className="flex items-center gap-2 hover:text-primary">
                                      <GoGear size={22} />
                                      <span className="text-[15.03px]">Account Settings</span>
                                    </Link>
                                  </li>
                                  <li className="flex items-center gap-4 text-gray-400">
                                    <div onClick={SignoutUser} className="cursor-pointer flex items-center gap-2 hover:text-primary">
                                      <PiSignOut size={22} />
                                      <span className="text-[15.03px]">Sign Out</span>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    :
                    // login & sign buttons 
                    <div className='flex gap-2'>
                      <Link href="/account/login">
                        <button className="hidden xl:inline-block px-6 py-2 rounded-[10px] bg-primary text-white hover:bg-primary">
                          Login
                        </button>
                      </Link>
                      <Link href="/account/signup">
                        <button className="hidden xl:inline-block px-6 py-2 rounded-[10px] bg-secondary text-white hover:bg-primary">
                          SignUp
                        </button>
                      </Link>
                    </div>
            }
            <div className='lg:hidden'>
              <FontAwesomeIcon icon={faBars} size={40} className="cursor-pointer " onClick={openSidebarMenu} />
            </div>
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
                  {/* <Link href="/dashboard/watchdog/overview">
                        <button className="md:hidden text-[18px] px-4 py-2 rounded-[10px] bg-secondary text-white hover:bg-blue-600">
                          Dashboard
                        </button>
                      </Link> */}
                </ul>
              </nav>
            </div>
          )}
          
        </header>
        <ToastContainer className="z-9999"/>  
      </div>

  );
}

export default Header;
