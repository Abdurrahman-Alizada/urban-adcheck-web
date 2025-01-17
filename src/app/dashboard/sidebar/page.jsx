'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoGridOutline, IoPersonOutline } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { BiTask, BiPlusCircle } from "react-icons/bi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useGetCurrentLoginUserQuery } from '@/redux/reducers/user/userThunk';
import SidebarLoader from '@/components/contentLoader/sidebar/page';

function Sidebar() {
  const { data: user, isLoading } = useGetCurrentLoginUserQuery();

  const ClientMenu = [
    { name: 'Overview', icon: <IoGridOutline size={21} />, url: '/dashboard/client/overview' },
    { name: 'View Profile', icon: <HiOutlineUserCircle size={21} />, url: '/dashboard/client/account-setting' },
    { name: 'Post a job', icon: <PiPlusBold size={21} />, url: '/dashboard/client/post-job' },
    { name: 'My Jobs', icon: <PiClipboardTextLight size={21} />, url: '/dashboard/client/my-jobs' },
    { name: 'Inbox', icon: <PiClipboardTextLight size={21} />, url: '/dashboard/client/inbox' },

  ];

  const WatchDogMenu = [
    { name: 'Dashboard', icon: <IoGridOutline size={22} />, url: '/dashboard/watchdog/overview' },
    { name: 'Financials', icon: <HiOutlineCurrencyDollar size={22} />, url: '/dashboard/watchdog/financial-overview' },
    { name: 'My Jobs', icon: <BiTask size={22} />, url: '/dashboard/watchdog/my-jobs' },
  ];

  const AdminMenu = [
    { name: 'Dashboard', icon: <IoGridOutline size={22} />, url: '/dashboard/admin/overview' },
    { name: 'Jobs', icon: <MdOutlineManageAccounts size={22} />, url: '/dashboard/admin/jobs' },
    { name: 'Users', icon: <FaRegUser size={22} />, url: '/dashboard/admin/users' },
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
      <div className="sticky bg-white ">
      <SidebarLoader />  
      </div>
    );
  }

  return (
    <div className="sticky bg-white py-6 ">
      {/* Profile Section */}
      <div className="p-4 flex items-center border-b border-gray-200">
        <Image
          src="/profile-Image.png"
          width={50}
          height={50}
          alt="Profile Image"
          className="rounded-full border-2 border-gray-300"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-800">{`${user?.fullName?.firstName} ${user?.fullName?.lastName}`}</h2>
          <p className="text-sm text-gray-500">{getRoleName()}</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="mt-4 px-4">
        {user?.role?.isClient && (
          <ul className="space-y-3">
            {ClientMenu.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.url}
                  className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
                >
                  {item.icon}
                  <span className="text-[15px] font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {user?.role?.isAdmin && (
          <ul className="space-y-3">
            {AdminMenu.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.url}
                  className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
                >
                  {item.icon}
                  <span className="text-[15px] font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {user?.role?.isWatchDog && (
          <ul className="space-y-3">
            {WatchDogMenu.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.url}
                  className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
                >
                  {item.icon}
                  <span className="text-[15px] font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;
