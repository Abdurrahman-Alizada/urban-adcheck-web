'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoGridOutline } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { PiClipboardTextLight, PiPlusBold } from "react-icons/pi";
import { HiOutlineUserCircle } from 'react-icons/hi';
import { FaRegUserCircle } from "react-icons/fa";
import { useGetCurrentLoginUserQuery } from '@/redux/reducers/user/userThunk';
import { FaRegRegistered } from 'react-icons/fa6';
import SidebarLoader from '@/components/contentLoader/sidebar/page';

function Sidebar() {
  const { data: user, isLoading } = useGetCurrentLoginUserQuery();
  console.log("user",user)
  const ClientMenu = [
    { name: 'Overview', icon: <IoGridOutline size={21} />, url: '/dashboard/client/overview' },
    { name: 'View Profile', icon: <HiOutlineUserCircle size={21} />, url: '/dashboard/client/account-setting' },
    { name: 'Post a job', icon: <PiPlusBold size={21} />, url: '/dashboard/client/post-job' },
    { name: 'My Jobs', icon: <PiClipboardTextLight size={21} />, url: '/dashboard/client/my-jobs' },
  ];

  const watchDogMenu = [
    { name: 'Overview', icon: <IoGridOutline size={21} />, url: '/dashboard/watchdog/overview' },
    { name: 'Financial overview', icon: <HiOutlineCurrencyDollar size={21} />, url: '/dashboard/watchdog/financial-overview' },
    { name: 'My Jobs', icon: <PiClipboardTextLight size={21} />, url: '/dashboard/watchdog/my-jobs' },
  ];

  const adminMenu = [
    { name: 'Dashboard', icon: <IoGridOutline size={21} />, url: '/dashboard/admin/overview' },
    { name: 'Jobs', icon: <FaRegRegistered size={21} />, url: '/dashboard/admin/jobs' },
    { name: 'Clients', icon: <FaRegUserCircle size={21} />, url: '/dashboard/admin/clients' },
    { name: 'WatchDogs', icon: <PiClipboardTextLight size={21} />, url: '/dashboard/admin/watchdog' },
  ];

  const getRoleName = () => {
    if (user?.role?.isAdmin) return 'Admin';
    if (user?.role?.isClient) return 'Client';
    if (user?.role?.isWatchDog) return 'WatchDog';
    if (user?.role?.isSuperAdmin) return 'Super Admin';
    return 'User';
  };

  if (isLoading) {
    return (
      <div className="sticky top-[var(--header-height)] bottom-[var(--footer-height)] bg-white shadow-custom-shadow rounded-[10px] py-4 mt-4 flex justify-center items-center">
        <span className="text-gray-400 text-[15px]">Loading...</span>
      </div>
    );
  }

  return (
    <div className="sticky top-[var(--header-height)] bottom-[var(--footer-height)] bg-white shadow-custom-shadow rounded-[10px] py-4 mt-4">
      <div className="p-3 flex justify-evenly border-b-[1px] border-gray-300">
        <Image
          src="/profile-Image.png"
          width={60}
          height={60}
          alt="Profile Image"
          className="object-contain rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-black font-medium text-[18.79px]">
            {user?.fullName?.firstName} {user?.fullName?.lastName}
          </span>
          <span className="text-gray-400 text-[13.79px]">{getRoleName()}</span>
        </div>
      </div>

      {/* Render menu based on role */}
      {user?.role?.isClient && (
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
      )}

      {user?.role?.isAdmin && (
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
      )}

      {user?.role?.isWatchDog && (
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
      )}
    </div>
  );
}

export default Sidebar;
