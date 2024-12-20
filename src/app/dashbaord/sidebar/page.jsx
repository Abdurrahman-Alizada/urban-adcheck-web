'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoGridOutline } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { GoPlusCircle, GoGear } from "react-icons/go";
import { PiClipboardTextLight, PiSignOut } from "react-icons/pi";
import { HiOutlineUserCircle } from 'react-icons/hi';
import { FaRegUserCircle } from "react-icons/fa";
import { useGetCurrentLoginUserQuery } from '@/redux/reducers/user/userThunk';
function Sidebar() {

  const { data: user, isLoading } = useGetCurrentLoginUserQuery();

  const ClientMenu = [
    { name: 'Overview', icon: <IoGridOutline size={21} />, url: '/dashbaord/client/overview' },
    { name: 'View Profile', icon: <HiOutlineUserCircle size={21} />, url: '/dashbaord/client/overview' },
    { name: 'My Jobs', icon: <PiClipboardTextLight size={21} />, url: '/dashbaord/client/myAds' },
    { name: 'Account Settings', icon: <GoGear size={21} />, url: '/dashbaord/client/account-setting' },
    { name: 'Sign Out', icon: <PiSignOut size={21} />, url: '/sign-out' },
  ];

  const watchDogMenu = [
    { name: 'Overview', icon: <IoGridOutline size={21} />, url: '/dashbaord/watchdog/overview' },
    { name: 'Financial overview', icon: <HiOutlineCurrencyDollar size={21} />, url: '/dashbaord/watchdog/financial-overview' },
    { name: 'My Jobs', icon: <PiClipboardTextLight size={21} />, url: '/dashbaord/watchdog/my-jobs' },
    { name: 'Account Settings', icon: <GoGear size={21} />, url: '/dashbaord/watchdog/account-setting' },
    { name: 'Sign Out', icon: <PiSignOut size={21} />, url: '/sign-out' },
  ];
  const adminMenu = [
    { name: 'Dashboard', icon: <IoGridOutline size={21} />, url: '/dashbaord/admin/dashboard' },
    { name: 'Clients', icon: <FaRegUserCircle size={21} />, url: '/dashbaord/admin/clients' },
    { name: 'WatchDogs', icon: <PiClipboardTextLight size={21} />, url: '/dashbaord/admin/watchdog' },
    { name: 'Account Settings', icon: <GoGear size={21} />, url: '/dashbaord/admin/account-setting' },
    { name: 'Sign Out', icon: <PiSignOut size={21} />, url: '/sign-out' },
  ];

  return (
    <div>
      {/* Left Sidebar */}
      <section className="w-[90%] hidden lg:inline-block bg-white shadow-custom-shadow rounded-[10px] mt-10 mb-10 ml-10 pb-5">
        {/* Profile info */}
        <div className="p-3 flex justify-evenly border-b-[1px] border-gray-300">
          <Image
            src="/profile-Image.png"
            width={60}
            height={60}
            alt="Profile Image"
            className="object-contain rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-black font-medium text-[18.79px]">Jenny Wilson</span>
            <span className="text-gray-400 text-[13.79px]">Member</span>
          </div>
        </div>

        {/* List of Items */}

        {
          user?.role?.isClient &&
          <ul className="flex flex-col gap-4 px-6 mt-4">
            {ClientMenu.map((tab) => (
              <li key={tab.name} className="flex items-center gap-2 text-gray-400">
                <Link href={tab.url} className="flex items-center gap-2 hover:text-primary">
                  {tab.icon}
                  <span className="text-[15.03px]">{tab.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        }

        
        {
          user?.role?.isAdmin &&
          <ul className="flex flex-col gap-4 px-6 mt-4">
            {adminMenu.map((tab) => (
              <li key={tab.name} className="flex items-center gap-2 text-gray-400">
                <Link href={tab.url} className="flex items-center gap-2 hover:text-primary">
                  {tab.icon}
                  <span className="text-[15.03px]">{tab.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        }

{
          user?.role?.isWatchDog &&
          <ul className="flex flex-col gap-4 px-6 mt-4">
            {watchDogMenu.map((tab) => (
              <li key={tab.name} className="flex items-center gap-2 text-gray-400">
                <Link href={tab.url} className="flex items-center gap-2 hover:text-primary">
                  {tab.icon}
                  <span className="text-[15.03px]">{tab.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        }

      </section>
    </div>
  );
}

export default Sidebar;
