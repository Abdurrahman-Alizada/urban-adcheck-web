'use client';

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SidebarLoader = () => {
  return (
    <div className="  bg-white  py-4 ">
      {/* Profile info Loader */}
      <div className="p-3 flex justify-evenly border-b-[1px] border-gray-300">
        <Skeleton circle width={60} height={60} />
        <div className="flex flex-col">
          <Skeleton height={20} width={100} />
          <Skeleton height={15} width={80} />
        </div>
      </div>

      {/* Menu Items Loader */}
      <ul className="flex flex-col gap-4 px-6 mt-4">
        {[...Array(4)].map((_, index) => (
          <li key={index} className="flex items-center gap-2">
            <Skeleton circle width={21} height={21} />
            <Skeleton height={20} width={120} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarLoader;
